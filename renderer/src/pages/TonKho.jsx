import React from 'react'

export default function TonKho({ db }) {
  return (
    <div>
      <h3>Tồn kho</h3>
      <table border="1" cellPadding="6">
        <thead>
          <tr><th>ID</th><th>Name</th><th>Unit</th><th>Quantity</th><th>Price</th><th>Total</th></tr>
        </thead>
        <tbody>
          {db.items.map(i => (
            <tr key={i.id}>
              <td>{i.id}</td>
              <td>{i.name}</td>
              <td>{i.unit}</td>
              <td>{i.quantity}</td>
              <td>{i.price}</td>
              <td>{(i.quantity || 0) * (i.price || 0)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
