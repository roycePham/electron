import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
} from '@mui/material';

export default function Login({ onLoginSuccess }) {
  const [u, setU] = useState('admin');
  const [p, setP] = useState('admin');
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    const ok = await window.api.login(u, p);
    if (ok) onLoginSuccess();
    else setErr('Sai tài khoản hoặc mật khẩu!');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #6366f1 0%, #60a5fa 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Segoe UI, Arial, sans-serif',
      }}
    >
      <Paper
        elevation={4}
        component="form"
        onSubmit={submit}
        sx={{
          borderRadius: 3,
          padding: 4,
          minWidth: 340,
          maxWidth: 360,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 900,
            color: '#6366f1',
            marginBottom: 3,
            letterSpacing: 1,
          }}
        >
          Đăng nhập hệ thống
        </Typography>

        <Typography sx={{ fontWeight: 600, color: '#334155', alignSelf: 'flex-start', mb: 1 }}>
          Tên đăng nhập
        </Typography>
        <TextField
          fullWidth
          value={u}
          onChange={(e) => setU(e.target.value)}
          autoFocus
          autoComplete="username"
          variant="outlined"
          size="medium"
        />

        <Typography sx={{ fontWeight: 600, color: '#334155', alignSelf: 'flex-start', mt: 2, mb: 1 }}>
          Mật khẩu
        </Typography>
        <TextField
          fullWidth
          type="password"
          value={p}
          onChange={(e) => setP(e.target.value)}
          autoComplete="current-password"
          variant="outlined"
          size="medium"
        />

        <Button
          type="submit"
          fullWidth
          sx={{
            mt: 3,
            background: 'linear-gradient(90deg, #6366f1 0%, #60a5fa 100%)',
            color: '#fff',
            fontWeight: 700,
            fontSize: 18,
            paddingY: 1.5,
            boxShadow: '0 2px 8px 0 rgba(99,102,241,0.10)',
            '&:hover': {
              opacity: 0.9,
              background: 'linear-gradient(90deg, #6366f1 0%, #60a5fa 100%)',
            },
          }}
        >
          Đăng nhập
        </Button>

        {err && (
          <Typography sx={{ color: '#ef4444', mt: 2, fontWeight: 600, fontSize: 15, textAlign: 'center' }}>
            {err}
          </Typography>
        )}
      </Paper>
    </Box>
  );
}