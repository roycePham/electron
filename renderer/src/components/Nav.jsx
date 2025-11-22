import React from 'react'

export default function Nav({ onNav, onLogout }) {
  return (
    <div style={{ display: 'flex', gap: 10, padding: 10, borderBottom: '1px solid #ddd' }}>
      <button onClick={() => onNav('dashboard')}>Dashboard</button>
      <button onClick={() => onNav('nhap')}>Nhập hàng</button>
      <button onClick={() => onNav('xuat')}>Xuất hàng</button>
      <button onClick={() => onNav('ton')}>Tồn kho</button>
      <div style={{ marginLeft: 'auto' }}>
        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  )
}
