import React from 'react'
import Product from './Components/Product'
import { Route, Routes } from 'react-router-dom'
import ProductDetail from './Components/ProductDetail'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Product />} />
        <Route path='/:productId' element={<ProductDetail />} />
      </Routes>
    </div>
  )
}

export default App
