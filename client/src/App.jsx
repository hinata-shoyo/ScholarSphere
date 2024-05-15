import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


const App = () => {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Homepage/>} />
      </Routes>
    </Router>
      
    </>
  )
}

export default App
