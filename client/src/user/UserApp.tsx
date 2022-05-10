import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { User } from '../types'
import HomePage from './pages/HomePage'
import UserNavbar from './UserNavbar'

interface Props {
  user: User,
  onLogout: () => void
}

export default function UserApp(props: Props) {
  return (
    <div >
      <BrowserRouter>
        <UserNavbar onLogout={props.onLogout} user={props.user} />
        <div className='container'>
          <div className='content'>
            <Routes>
              <Route path='*' element={<HomePage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>

    </div>
  )
}
