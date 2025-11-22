import React, { useState } from 'react'
export default function Login({ onLoginSuccess }) {
    const [u, setU] = useState('admin')
    const [p, setP] = useState('admin')
    const [err, setErr] = useState('')

    const submit = async () => {
        setErr('')
        console.log(u, p)
        const ok = await window.api.login(u, p)
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