import React, { useState } from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <div>
      {loggedIn ? (
        <Dashboard onLogout={() => setLoggedIn(false)} />
      ) : (
        <Login onLoginSuccess={() => setLoggedIn(true)} />
      )}
    </div>
  )
}
