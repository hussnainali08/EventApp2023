import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';

export default function index() {
  return (
      <>
          <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
       </Routes>
      </>
  )
}





