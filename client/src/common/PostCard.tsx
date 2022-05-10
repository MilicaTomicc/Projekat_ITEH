import React, { useState } from 'react'
import { Form, Input, Schema } from 'rsuite';
import { Post } from '../types'
import UserAvatar from './UserAvatar'

interface Props {
  post: Post,
  onComment: (text: string) => Promise<void>
}
const model = Schema.Model({
  content: Schema.Types.StringType().isRequired('Please enter a comment')
})
export default function PostCard(props: Props) {
  const [openComments, setOpenComments] = useState(false);
  const [formValue, setFormValue] = useState({ content: '' });
  return (
    <div className='post-card'>
      <UserAvatar user={props.post.user} />
      <div>
        Category: {props.post.postCategory?.value}
      </div>
      <div>
      </div>
      <div style={{ paddingTop: '20px', paddingBottom: '5px', borderBottom: '1px solid rgba(20, 32, 65, 0.15)' }}>
        <div dangerouslySetInnerHTML={{ __html: props.post.content }} />
      </div>
      <div>
        <div onClick={() => setOpenComments(prev => !prev)} className='hover-text'>Comments</div>
      </div>
      {
        openComments && (
          <div>
            {
              props.post.comments?.map(c => {
                return (
                  <div >
                    <UserAvatar size='sm' user={c.user} />
                    <div className='bb' style={{ paddingLeft: '40px', paddingBottom: '10px' }}>
                      {c.content}
                    </div>
                  </div>
                )
              })
            }
            <Form
              model={model}
              checkTrigger='none'
              formValue={formValue} onChange={val => setFormValue(val as any)}
              onSubmit={async ch => {
                if (!ch) {
                  return;
                }
                await props.onComment(formValue.content);
                setFormValue({ content: '' })
              }}
              fluid>
              <Form.Control name='content' placeholder='Write a comment' className='comment-input' />
            </Form>
          </div>
        )
      }
    </div>
  )
}
