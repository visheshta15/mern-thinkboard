import React from 'react'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import CreatePage from './pages/CreatePage'
import UpdatePage from './pages/UpdatePage'
import GetNotesPage from './pages/GetNotesPage'

const App = () => {
  return (
    <div data-theme="lemonade" className='p-4 m-5'>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="/notes" element={<GetNotesPage />} />
      <Route path="/note/:id" element={<UpdatePage />} />
    </Routes>
    </div>
    
  )
}

export default App