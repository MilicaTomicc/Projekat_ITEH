import React from 'react'
import { Avatar } from 'rsuite'
import { User } from '../types'

interface Props {
  user?: User,
  size?: 'lg' | 'md' | 'sm' | 'xs'
}

export default function UserAvatar(props: Props) {
  if (!props.user) {
    return null;
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Avatar size={props.size || 'lg'} circle src={props.user.imageUrl} />
      <div style={{ fontSize: '18px', paddingLeft: '10px' }}>{props.user.firstName + props.user.lastName}</div>
    </div>
  )
}
