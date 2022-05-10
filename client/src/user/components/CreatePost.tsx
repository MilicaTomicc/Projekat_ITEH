import React, { useState } from 'react'
import { InputPicker, Modal, Button } from 'rsuite'
import { EditorWrapper } from '../../common/EditorWrapper';
import { Post, PostCategory } from '../../types'

interface Props {
  onSubmit: (post: Partial<Post>) => Promise<void>,
  open: boolean,
  onClose: () => void,
  categories: PostCategory[]
}

export default function CreatePost(props: Props) {
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [content, setContent] = useState('');
  return (
    <Modal
      open={props.open}
      size='lg'
      onClose={props.onClose}
    >
      <Modal.Header>
        <Modal.Title>Create post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputPicker
          className='fluid'
          placeholder='Category'
          onChange={(val) => { setSelectedCategoryId(Number(val)) }}
          data={props.categories.map(e => {
            return {
              value: e.id,
              label: e.value
            }
          })}
        />
        <EditorWrapper content={content} setContent={setContent} />
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={async () => {
            await props.onSubmit({
              postCategoryId: selectedCategoryId,
              content: content,
            })
            props.onClose();
          }}
          className='fluid' appearance='primary'>Post</Button>
      </Modal.Footer>
    </Modal>
  )
}
