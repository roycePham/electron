import React, { useState } from 'react';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import { Box, GlobalStyles } from '@mui/material';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <GlobalStyles styles={{
        html: { overflow: "hidden", height: "100%" },
        body: { overflow: "hidden", height: "100%", margin: 0, padding: 0 }
      }} />
      <Box sx={{
        height: '100vh',       // ép toàn bộ App cao bằng viewport
        overflow: 'hidden',    // chặn scroll toàn trang
        display: 'flex',
        flexDirection: 'column',
      }}>
        {loggedIn ? (
          <MainPage onLogout={() => setLoggedIn(false)} />
        ) : (
          <Login onLoginSuccess={() => setLoggedIn(true)} />
        )}
      </Box>
    </>
  );
}
