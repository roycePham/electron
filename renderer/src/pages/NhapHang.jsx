
import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

export default function NhapHang({ db, onSave }) {
  const [itemId, setItemId] = useState('');
  const [name, setName] = useState('');
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

  const addImport = () => {
    const newDb = JSON.parse(JSON.stringify(db));
    let item = newDb.items.find(i => i.id === itemId);
    if (!item) {
      item = { id: itemId || ('G' + (newDb.items.length + 1).toString().padStart(3, '0')), name, unit: 'm3', quantity: 0, price };
      newDb.items.push(item);
    }
    item.quantity = (item.quantity || 0) + Number(qty);
    item.price = Number(price) || item.price;

    newDb.imports.push({ id: 'IMP' + Date.now(), itemId: item.id, qty: Number(qty), price: Number(price), date: new Date().toISOString() });

    onSave(newDb);
    setItemId(''); setName(''); setQty(0); setPrice(0);
  };

  return (
    <Box>
      <Typography variant="h6" fontWeight={700} color="primary" mb={2}>
        Nhập hàng
      </Typography>
      <Box mb={2}>
        <Typography fontWeight={600} mb={0.5}>ID sản phẩm</Typography>
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          value={itemId}
          onChange={e => setItemId(e.target.value)}
          placeholder="Nhập ID sản phẩm"
        />
      </Box>
      <Box mb={2}>
        <Typography fontWeight={600} mb={0.5}>Tên sản phẩm</Typography>
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Nhập tên sản phẩm"
        />
      </Box>
      <Box mb={2}>
        <Typography fontWeight={600} mb={0.5}>Số lượng</Typography>
        <TextField
          fullWidth
          size="small"
          type="number"
          variant="outlined"
          value={qty}
          onChange={e => setQty(e.target.value)}
          placeholder="Nhập số lượng"
        />
      </Box>
      <Box mb={2}>
        <Typography fontWeight={600} mb={0.5}>Giá</Typography>
        <TextField
          fullWidth
          size="small"
          type="number"
          variant="outlined"
          value={price}
          onChange={e => setPrice(e.target.value)}
          placeholder="Nhập giá"
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ fontWeight: 700, fontSize: 16, mt: 2 }}
        onClick={addImport}
      >
        Thêm nhập
      </Button>
    </Box>
  );
}
