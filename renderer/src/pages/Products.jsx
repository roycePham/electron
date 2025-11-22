import React, { useState } from 'react';
import NhapHang from './NhapHang';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

export default function Products({ db, onSave }) {
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);

  const filtered = db.items.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    String(i.id).includes(search)
  );

  // Dummy handlers
  const handleEdit = (item) => alert('Sửa: ' + item.name + ' (chưa code)');
  const handleDelete = (item) => alert('Xóa: ' + item.name + ' (chưa code)');

  // Khi thêm mới thành công thì đóng dialog
  const handleAddSuccess = (newDb) => {
    onSave && onSave(newDb);
    setShowAdd(false);
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      height: '100vh',
      p: 1
    }}>
      <Paper elevation={3} sx={{
        borderRadius: 3,
        p: 1,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        height: '100vh',
        // height: 'calc(100vh - 48px)', // fix Paper height to viewport minus some offset for padding/margin
        boxSizing: 'border-box',
      }}>
        {/* Sticky header */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 4,
          pt: 4,
          pb: 2,
          zIndex: 2,
          bgcolor: '#fff',
          position: 'sticky',
          top: 0
        }}>
          <Typography variant="h5" fontWeight={800} color="primary" sx={{ letterSpacing: 1 }}>
            🛒 Sản phẩm
          </Typography>
          <Box>
            <TextField
              size="small"
              variant="outlined"
              placeholder="Tìm kiếm sản phẩm hoặc ID..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              sx={{ minWidth: 180, mr: 2 }}
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setShowAdd(true)}
              sx={{
                background: 'linear-gradient(90deg, #22d3ee 0%, #6366f1 100%)',
                color: '#fff',
                fontWeight: 700,
                fontSize: 16,
                borderRadius: 2,
                boxShadow: '0 2px 8px 0 rgba(99,102,241,0.10)',
                ml: 1,
                '&:hover': { opacity: 0.9, background: 'linear-gradient(90deg, #22d3ee 0%, #6366f1 100%)' }
              }}
            >
              Thêm sản phẩm
            </Button>
          </Box>
        </Box>
        {/* Table head sticky */}
        <TableContainer sx={{ borderRadius: 2, boxShadow: 0, overflow: 'hidden', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          <Table size="small" sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ background: '#6366f1', position: 'sticky', top: 0, zIndex: 1 }}>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>ID</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Tên sản phẩm</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Đơn vị</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Số lượng</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Đơn giá</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Thành tiền</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Thao tác</TableCell>
              </TableRow>
            </TableHead>
          </Table>
          {/* Scrollable table body */}
          <Box sx={{ flex: 1, overflow: 'auto' }}>
            <Table size="small" sx={{ minWidth: 650 }}>
              <TableBody>
                {filtered.map(i => (
                  <TableRow key={i.id}>
                    <TableCell align="center">{i.id}</TableCell>
                    <TableCell align="center">{i.name}</TableCell>
                    <TableCell align="center">{i.unit}</TableCell>
                    <TableCell align="center">{i.quantity}</TableCell>
                    <TableCell align="center">{i.price}</TableCell>
                    <TableCell align="center">{(i.quantity || 0) * (i.price || 0)}</TableCell>
                    <TableCell align="center">
                      <IconButton color="primary" onClick={() => handleEdit(i)} size="small">
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(i)} size="small">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </TableContainer>
      </Paper>

      {/* Dialog thêm mới */}
      <Dialog open={showAdd} onClose={() => setShowAdd(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, color: 'primary.main' }}>
          Thêm sản phẩm mới
          <IconButton
            aria-label="close"
            onClick={() => setShowAdd(false)}
            sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <NhapHang db={db} onSave={handleAddSuccess} />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
