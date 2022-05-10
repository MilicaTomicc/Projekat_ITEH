import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './auth/Login';
import Register from './auth/Register';
import logo from './logo.svg';
import { LoginUser, RegisterUser, User } from './types';
import { Container, FlexboxGrid } from 'rsuite'
import axios from 'axios'
import UserApp from './user/UserApp';
axios.defaults.baseURL = 'https://localhost:8000';
axios.defaults.withCredentials = true;
function App() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!loading || !!user) {
      return;
    }
    axios.get('/auth/check').then(res => {
      setUser(res.data);
    }).finally(() => {
      setLoading(false);
    })
  }, [loading, user])

  const login = async (u: Partial<LoginUser>) => {
    const res = await axios.post('/auth/login', u);
    setUser(res.data);
  }
  const register = async (u: Partial<RegisterUser>) => {
    const res = await axios.post('/auth/register', u);
    setUser(res.data);
  }

  const logout = async () => {
    await axios.post('/user/logout');
    setUser(undefined);
  }

  if (loading) {
    return (
      <div></div>
    );
  }
  if (!user) {
    return (
      <Container>
        <FlexboxGrid className='pt' justify='space-around'>
          <FlexboxGrid.Item colspan={8}>
            <img width='100%' alt='Chat' src='https://media.istockphoto.com/vectors/social-network-vector-illustration-vector-id614250216' />
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={8}>
            <BrowserRouter>
              <Routes>
                <Route path='/register' element={<Register onSubmit={register} />} />
                <Route path='*' element={<Login onSubmit={login} />} />
              </Routes>
            </BrowserRouter>
          </FlexboxGrid.Item>

        </FlexboxGrid>
      </Container>
    )
  }

  if (!user.admin) {
    return (
      <UserApp user={user} onLogout={logout} />
    )
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
