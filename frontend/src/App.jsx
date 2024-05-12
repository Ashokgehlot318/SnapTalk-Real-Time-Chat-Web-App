import React from 'react'
import "./App.css"
import { Route, Routes } from 'react-router-dom';
import  Home  from './pages/Home';
import  ChatPage  from './pages/ChatPage'
import Login from './pages/Login';
import SignUp from './pages/SignUp';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/chats" element={<ChatPage />} />
      </Routes>
    </div>
  )
}

export default App
