import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
const API = axios.create({ baseURL: API_URL, timeout: 10000 });

export default function AdminDashboard() {
  const [token, setToken] = useState(localStorage.getItem('admin_token'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await API.post('/api/auth/login', { email, password });
      const t = res.data.data.token;
      localStorage.setItem('admin_token', t);
      setToken(t);
    } catch {
      setError('Login failed');
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <form onSubmit={login} className="bg-white/5 p-8 rounded-2xl w-full max-w-sm space-y-4">
          <h1 className="text-2xl font-bold text-center mb-2">Admin Login</h1>
          <input
            type="email" placeholder="Email" required
            value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 px-4 rounded-xl bg-white/10 text-white border border-white/20"
          />
          <input
            type="password" placeholder="Password" required
            value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full h-12 px-4 rounded-xl bg-white/10 text-white border border-white/20"
          />
          {error && <p className="text-yellow-400 text-sm">{error}</p>}
          <button type="submit" className="w-full h-12 bg-yellow-600 rounded-xl font-semibold text-black hover:bg-yellow-700">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold"><span className="text-yellow-500">EVOLVE</span> ADMIN</h1>
        <button
          onClick={() => { localStorage.removeItem('admin_token'); setToken(null); }}
          className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20"
        >
          Logout
        </button>
      </div>
      <p className="text-gray-400">Admin dashboard is available on the full site at <a href="http://localhost:3000/admin" className="text-yellow-400 underline">localhost:3000/admin</a></p>
    </div>
  );
}
