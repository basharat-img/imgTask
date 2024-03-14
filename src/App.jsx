import React, { useState } from 'react'
import Card from './Card'
import Cart from '../Cart'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./app.scss"
import MaterialCard from './MaterialCard'

const App = () => {

  return (
    // <Card   />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MaterialCard />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App