import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<div>PhysioPath Welcome</div>} />
          <Route path="/login" element={<div>Therapist Login</div>} />
          <Route path="/dashboard" element={<div>Therapist Dashboard</div>} />
          <Route path="/patient/:token" element={<div>Patient Portal</div>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
