import React, { useState } from 'react'

export default function XuatHang({ db, onSave }) {
  const [itemId, setItemId] = useState('')
  const [qty, setQty] = useState(0)

  const addExport = () => {
    const newDb = JSON.parse(JSON.stringify(db))
    const item = newDb.items.find(i => i.id === itemId)
    if (!item) { alert('Item not found'); return }
    if (item.quantity < qty) { alert('Not enough stock'); return }

    item.quantity = item.quantity - Number(qty)
    newDb.exports.push({ id: 'EXP' + Date.now(), itemId, qty: Number(qty), price: item.price, date: new Date().toISOString() })

    onSave(newDb)
    setItemId(''); setQty(0)
  }

  return (
    <div>
      <h3>Xuất hàng</h3>
      <div>
        <label>ID</label><br />
        <input value={itemId} onChange={e => setItemId(e.target.value)} />
      </div>
      <div>
        <label>Số lượng</label><br />
        <input type="number" value={qty} onChange={e => setQty(e.target.value)} />
      </div>
      <div style={{ marginTop: 10 }}>
        <button onClick={addExport}>Thêm xuất</button>
      </div>
    </div>
  )
}
