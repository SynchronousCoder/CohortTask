import React from 'react'
import Note from './components/Note'
import { Route, Routes } from 'react-router-dom'
import Edit from './components/Edit'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Note />} />
        <Route path='/edit/:id' element={<Edit />} />
      </Routes>
    </div>
  )
}

export default App