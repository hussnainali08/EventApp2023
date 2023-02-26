import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Frontend from './Frontend';
import Authentication from './Authentication';

export default function Index() {
  return (
      <>
          <BrowserRouter>
              <Routes>
                  <Route path='/*' element={<Frontend /> } />
                  <Route path='/authentication/*' element={<Authentication /> } />
          </Routes>
          </BrowserRouter>
      </>
  )
}
