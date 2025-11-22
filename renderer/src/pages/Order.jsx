import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button } from '@mui/material';

export default function Order({ db, onSave }) {
  const [itemId, setItemId] = useState('');
  const [qty, setQty] = useState(0);

  const addExport = () => {
    const newDb = JSON.parse(JSON.stringify(db));
    const item = newDb.items.find(i => i.id === itemId);
    if (!item) { alert('Không tìm thấy sản phẩm'); return; }
    if (item.quantity < qty) { alert('Không đủ tồn kho'); return; }

    item.quantity = item.quantity - Number(qty);
    newDb.exports.push({ id: 'EXP' + Date.now(), itemId, qty: Number(qty), price: item.price, date: new Date().toISOString() });

    onSave(newDb);
    setItemId(''); setQty(0);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight={800} color="primary" mb={3}>
          Xuất hàng
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
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ fontWeight: 700, fontSize: 16, mt: 2 }}
          onClick={addExport}
        >
          Thêm xuất
        </Button>
      </Paper>
    </Box>
  );
}
