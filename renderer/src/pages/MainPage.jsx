import React, { useState, useEffect } from 'react';
import {
  Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Button, Avatar
} from '@mui/material';
import { Fastfood, ShoppingCart, People, Settings as SettingsIcon, Logout } from '@mui/icons-material';
import Dashboard from './Dashboard';
import Order from './Order';
import Users from './Users';
import Settings from './Settings';
import Products from './Products';

const drawerWidth = 240;
const menu = [
  { key: 'dashboard', label: 'Dashboard', icon: <Fastfood /> },
  { key: 'product', label: 'Products', icon: <Fastfood /> },
  { key: 'order', label: 'Orders', icon: <ShoppingCart /> },
  { key: 'users', label: 'Users', icon: <People /> },
  { key: 'settings', label: 'Settings', icon: <SettingsIcon /> },
];

const pageFormat = {
  height: "100vh",
  overflow: "hidden",
  p: 1,
  display: "flex",
  flexDirection: "column",
};

export default function MainPage({ onLogout }) {
  const [view, setView] = useState('dashboard');
  const [db, setDb] = useState(null);

  useEffect(() => {
    window.api.readData().then(setDb);
  }, []);

  const save = async (newDb) => {
    await window.api.writeData(newDb);
    setDb(newDb);
  };

  if (!db) return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f8fafc' }}>
      <Typography variant="h5" color="primary">Đang tải dữ liệu...</Typography>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f4f6ff', overflow: 'hidden' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', borderRight: 'none', bgcolor: '#fff', pt: 2 },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', px: 3, mb: 2 }}>
          <Fastfood color="primary" sx={{ fontSize: 32, mr: 1 }} />
          <Typography variant="h6" fontWeight={900}>Food Admin</Typography>
        </Box>
        <List>
          {menu.map(item => (
            <ListItem
              key={item.key}
              component="button"
              selected={view === item.key}
              onClick={() => setView(item.key)}
            >
              <ListItemIcon sx={{ color: view === item.key ? 'primary.main' : 'grey.600' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: view === item.key ? 700 : 500 }} />
            </ListItem>
          ))}
        </List>
        <Box sx={{ flex: 1 }} />
        <Box sx={{ px: 3, pb: 2, display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ width: 36, height: 36, mr: 1 }}>JD</Avatar>
          <Box>
            <Typography fontWeight={700} fontSize={15}>John Doe</Typography>
            <Typography fontSize={13} color="text.secondary">Admin</Typography>
          </Box>
        </Box>
        <Button startIcon={<Logout />} color="error" variant="text" sx={{ m: 2, fontWeight: 700 }} onClick={onLogout}>Logout</Button>
      </Drawer>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#f5f5f5',
          height: '100vh',     // ép full chiều cao
          overflow: 'hidden',  // chặn scroll
        }}
      >
        {/* <Box component="main" sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}}> */}
        {view === 'dashboard' && <Dashboard db={db} />}
        {view === 'product' && <Products db={db} onSave={save} />}
        {view === 'order' && <Order db={db} onSave={save} />}
        {view === 'users' && <Users />}
        {view === 'settings' && <Settings />}
      </Box>
    </Box>
  );
}
