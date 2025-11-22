import React, { useState } from 'react'

export default function NhapHang({ db, onSave }) {
  const [itemId, setItemId] = useState('')
  const [name, setName] = useState('')
  const [qty, setQty] = useState(0)
  const [price, setPrice] = useState(0)

  const addImport = () => {
    const newDb = JSON.parse(JSON.stringify(db))
    let item = newDb.items.find(i => i.id === itemId)
    if (!item) {
      item = { id: itemId || ('G' + (newDb.items.length + 1).toString().padStart(3, '0')), name, unit: 'm3', quantity: 0, price };
      newDb.items.push(item)
    }
    item.quantity = (item.quantity || 0) + Number(qty)
    item.price = Number(price) || item.price

    newDb.imports.push({ id: 'IMP' + Date.now(), itemId: item.id, qty: Number(qty), price: Number(price), date: new Date().toISOString() })

    onSave(newDb)
    setItemId(''); setName(''); setQty(0); setPrice(0)
  }

  return (
    <div>
      <h3>Nhập hàng</h3>
      <div>
        <label>ID</label><br />
        <input value={itemId} onChange={e => setItemId(e.target.value)} />
      </div>
      <div>
        <label>Name</label><br />
        <input value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div>
        <label>Số lượng</label><br />
        <input type="number" value={qty} onChange={e => setQty(e.target.value)} />
      </div>
      <div>
        <label>Giá</label><br />
        <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
      </div>
      <div style={{ marginTop: 10 }}>
        <button onClick={addImport}>Thêm nhập</button>
      </div>
    </div>
  )
}
