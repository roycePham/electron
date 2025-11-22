
import React, { useState, useEffect } from 'react';
import {
  Box, Typography
} from '@mui/material';
import InsertChartIcon from '@mui/icons-material/InsertChart';

export default function Dashboard({ db }) {
  if (!db) return null;
  return (
    <Box sx={{ width: '100%', maxWidth: 700, bgcolor: '#fff', borderRadius: 6, boxShadow: '0 8px 32px 0 rgba(99,102,241,0.10)', p: { xs: 2, md: 6 }, mx: 'auto', textAlign: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
        <InsertChartIcon color="primary" sx={{ fontSize: 40, mr: 1 }} />
        <Typography variant="h4" fontWeight={900} sx={{ mb: 0 }}>Thống kê tổng quan</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 4, flexWrap: 'wrap' }}>
        <Box sx={{ bgcolor: '#f4f6fb', borderRadius: 4, px: 6, py: 4, minWidth: 180, mb: 2 }}>
          <Typography fontSize={24} fontWeight={600} color="#374151">Tổng mặt hàng</Typography>
          <Typography fontSize={40} fontWeight={900} color="#374151">{db.items.length}</Typography>
        </Box>
        <Box sx={{ bgcolor: '#f4f6fb', borderRadius: 4, px: 6, py: 4, minWidth: 180, mb: 2 }}>
          <Typography fontSize={24} fontWeight={600} color="#374151">Nhập kho</Typography>
          <Typography fontSize={40} fontWeight={900} color="#374151">{db.imports.length}</Typography>
        </Box>
        <Box sx={{ bgcolor: '#f4f6fb', borderRadius: 4, px: 6, py: 4, minWidth: 180, mb: 2 }}>
          <Typography fontSize={24} fontWeight={600} color="#374151">Xuất kho</Typography>
          <Typography fontSize={40} fontWeight={900} color="#374151">{db.exports.length}</Typography>
        </Box>
      </Box>
    </Box>
  );
}