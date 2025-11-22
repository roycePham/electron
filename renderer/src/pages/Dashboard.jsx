import React, { useState, useEffect } from 'react'
import Nav from '../components/Nav'
import NhapHang from './NhapHang'
import XuatHang from './XuatHang'
import TonKho from './TonKho'

export default function Dashboard({ onLogout }) {
  const [view, setView] = useState('dashboard')
  const [db, setDb] = useState(null)

  useEffect(() => {
    window.api.readData().then(setDb)
  }, [])

  const save = async (newDb) => {
    await window.api.writeData(newDb)
    setDb(newDb)
  }

  if (!db) return <div>Loading...</div>

  return (
    <div>
      <Nav onNav={setView} onLogout={onLogout} />
      <div style={{ padding: 20 }}>
        {view === 'dashboard' && (
          <div>
            <h2>Dashboard</h2>
            <div>Total items: {db.items.length}</div>
            <div>Imports: {db.imports.length}</div>
            <div>Exports: {db.exports.length}</div>
          </div>
        )}
        {view === 'nhap' && <NhapHang db={db} onSave={save} />}
        {view === 'xuat' && <XuatHang db={db} onSave={save} />}
        {view === 'ton' && <TonKho db={db} />}
      </div>
    </div>
  )
}
