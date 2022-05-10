import axios from 'axios';
import React, { useState } from 'react'
import PostCard from '../../common/PostCard';
import Spinner from '../../common/Spinner';
import useGet from '../../hooks/useGet'
import { Post, PostCategory } from '../../types';
import CreatePost from '../components/CreatePost';

export default function HomePage() {
  const [posts, setPosts] = useGet<Post[]>('/post', []);
  const [categories] = useGet<PostCategory[]>('/post-category');
  const [openModal, setOpenModal] = useState(false)
  if (!posts) {
    return (
      <Spinner />
    )
  }
  return (
    <div>
      <CreatePost
        categories={categories || []}
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={async (post) => {
          const res = await axios.post('/post', post);
          const newPost = {
            ...res.data,
            postCategory: categories?.find(e => e.id === res.data.postCategoryId)
          }
          setPosts(prev => !prev ? [newPost] : [newPost, ...prev]);
        }}
      />
      <div>
        <div
          onClick={() => setOpenModal(true)}
          className='post-modal-trigger'>
          Whats on your mind...
        </div>
      </div>
      {
        posts.map(post => {
          return (
            <PostCard
              onComment={async text => {
                const res = await axios.post(`/post/${post.id}/comment`, { content: text });
                setPosts(prev => {
                  if (!prev) {
                    return [];
                  }
                  return prev.map(element => {
                    if (element === post) {
                      return {
                        ...post,
                        comments: !element.comments ? [res.data] : [...element.comments, res.data]
                      }
                    }
                    return element;
                  })
                })
              }}
              key={post.id} post={post} />
          )
        })
      }
    </div>
  )
}
