import React, { useState } from 'react'

// function md5(text) {
//   let h=0;
//   for(let i=0;i<text.length;i++) h = (h<<5)-h+text.charCodeAt(i)|0;
//   return ('00000000'+(h>>>0).toString(16)).slice(-8);
// }

export default function Login({ onLoginSuccess }) {
  const [u, setU] = useState('admin')
  const [p, setP] = useState('admin')
  const [err, setErr] = useState('')

  const submit = async () => {
    setErr('')
    // const passwordHash = md5(p)
    const ok = await window.api.login(u, p)
    console.log(ok);
    if (ok) onLoginSuccess()
    else setErr('Login failed')
  }

  return (
    <div style={{ padding: 30 }}>
      <h2>Login</h2>
      <div>
        <label>Username</label><br />
        <input value={u} onChange={e => setU(e.target.value)} />
      </div>
      <div>
        <label>Password</label><br />
        <input type="password" value={p} onChange={e => setP(e.target.value)} />
      </div>
      <div style={{ marginTop: 10 }}>
        <button onClick={submit}>Login</button>
      </div>
      {err && <div style={{ color: 'red' }}>{err}</div>}
    </div>
  )
}
