// src/components/Login.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Profile from './Profile';

const API_BASE = 'http://localhost:8000/';

export default function Login() {
    const [dni, setDni]       = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage]   = useState('');
    const [user, setUser]         = useState(null);
    const [loading, setLoading]   = useState(true);

    useEffect(() => {
        const token      = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (token && storedUser) {
        axios.defaults.headers.common['Authorization'] = `Token ${token}`;
        setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const handleLogin = async e => {
        e.preventDefault();
        setMessage('');
        try {
        const { data } = await axios.post(
            `${API_BASE}/users/login/`,
            { dni, password }
        );
        const { token, user } = data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        axios.defaults.headers.common['Authorization'] = `Token ${token}`;
        setUser(user);
        setMessage('Login successful');
        } catch {
        setMessage('Login error');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
        setMessage('');
    };

    if (loading) return <div>Loading...</div>;

    if (user) {
        return (
            <div>
                <Profile user = {user} />
                <button onClick = {handleLogout}>Logout</button>
                {message && <div>{message}</div>}
            </div>
        );
    }

    return (
        <div>
        <h3>Login</h3>
        <form onSubmit={handleLogin}>
            <div>
            <label>DNI:</label>
            <input
                type="text"
                value={dni}
                onChange={e => setDni(e.target.value)}
                required
            />
            </div>
            <div>
            <label>Password:</label>
            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />
            </div>
            <button type="submit">Login</button>
        </form>
        {message && <div>{message}</div>}
        </div>
    );
}
