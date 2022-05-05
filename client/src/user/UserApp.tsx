import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { User } from '../types'
import UserNavbar from './UserNavbar'

interface Props {
  user: User,
  onLogout: () => void
}

export default function UserApp(props: Props) {
  return (
    <div>
      <BrowserRouter>
        <UserNavbar onLogout={props.onLogout} user={props.user} />
      </BrowserRouter>

    </div>
  )
}
