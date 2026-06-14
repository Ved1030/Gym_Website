'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users, Dumbbell, CreditCard, Images, Star, LogOut, Menu, X,
  Mail, Phone, Download,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api } from '@/services/api';

type Tab = 'dashboard' | 'leads' | 'contacts' | 'plans' | 'trainers' | 'gallery' | 'testimonials';

interface AdminState {
  token: string;
  user: { id: string; name: string; email: string; role: string };
}

function renderTable(columns: string[], rows: any[]) {
  return (
    <div className="glass rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {columns.map((col) => (
                <th key={col} className="text-left p-3 text-muted-foreground font-medium whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan={columns.length} className="p-6 text-center text-muted-foreground">No data found</td></tr>
            ) : (
              rows.map((row: any, i: number) => (
                <tr key={row.id || i} className="border-b border-border/50 hover:bg-white/5 transition-colors">
                  {columns.map((col) => (
                    <td key={col} className="p-3 whitespace-nowrap">
                      {col === 'Date' || col === 'CreatedAt'
                        ? new Date(row.createdAt).toLocaleDateString()
                        : row[col.toLowerCase()] || row[col.toLowerCase().replace(' ', '_')] || '-'}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [auth, setAuth] = useState<AdminState | null>(null);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [tab, setTab] = useState<Tab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState('');

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await api.post('/api/auth/login', loginForm);
      setAuth(res.data.data);
      localStorage.setItem('admin_token', res.data.data.token);
    } catch (err: any) {
      setLoginError(err.response?.data?.error || 'Login failed');
    }
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('admin_token');
  };

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      api.get('/api/admin/leads', { headers: { Authorization: `Bearer ${token}` } })
        .then(() => setAuth({ token, user: { id: '', name: 'Admin', email: '', role: 'ADMIN' } }))
        .catch(() => localStorage.removeItem('admin_token'));
    }
  }, []);

  const fetchData = async (t: Tab) => {
    if (!auth) return;
    setError('');
    try {
      const headers = { Authorization: `Bearer ${auth.token}` };
      let res;
      switch (t) {
        case 'leads': res = await api.get('/api/admin/leads', { headers }); break;
        case 'contacts': res = await api.get('/api/admin/contacts', { headers }); break;
        case 'plans': res = await api.get('/api/plans'); break;
        case 'trainers': res = await api.get('/api/trainers'); break;
        case 'gallery': res = await api.get('/api/gallery'); break;
        case 'testimonials': res = await api.get('/api/testimonials'); break;
        default: res = { data: { data: [] } };
      }
      setData(res.data.data || []);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch');
    }
  };

  useEffect(() => { if (auth && tab !== 'dashboard') fetchData(tab); }, [tab, auth]);

  const exportLeads = async () => {
    try {
      const res = await api.get('/api/admin/leads/export', {
        headers: { Authorization: `Bearer ${auth?.token}` },
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement('a');
      a.href = url; a.download = 'leads.csv'; a.click();
    } catch { setError('Export failed'); }
  };

  const deleteItem = async (endpoint: string, id: string) => {
    try {
      await api.delete(`/api/admin/${endpoint}/${id}`, {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });
      fetchData(tab);
    } catch { setError('Delete failed'); }
  };

  if (!auth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-8 w-full max-w-sm"
        >
          <h1 className="text-2xl font-bold text-center mb-2">Admin Login</h1>
          <p className="text-sm text-muted-foreground text-center mb-6">Mythos Fitness Dashboard</p>
          <form onSubmit={login} className="space-y-4">
            <Input
              type="email" placeholder="Email" required
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              className="bg-background/50"
            />
            <Input
              type="password" placeholder="Password" required
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              className="bg-background/50"
            />
            {loginError && <p className="text-sm text-destructive">{loginError}</p>}
            <Button type="submit" className="w-full">Login</Button>
          </form>
        </motion.div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: Users },
    { id: 'leads', label: 'Leads', icon: Mail },
    { id: 'contacts', label: 'Contacts', icon: Phone },
    { id: 'plans', label: 'Plans', icon: CreditCard },
    { id: 'trainers', label: 'Trainers', icon: Dumbbell },
    { id: 'gallery', label: 'Gallery', icon: Images },
    { id: 'testimonials', label: 'Testimonials', icon: Star },
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 glass border-b border-border/50 px-4 h-14 flex items-center justify-between">
        <button className="lg:hidden p-2" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <span className="font-bold text-sm"><span className="text-primary">MYTHOS</span> ADMIN</span>
        <Button variant="ghost" size="sm" onClick={logout} className="gap-2 text-muted-foreground">
          <LogOut className="h-4 w-4" /> Logout
        </Button>
      </nav>

      <div className="flex">
        <aside className={`fixed lg:sticky top-14 left-0 h-[calc(100vh-3.5rem)] w-60 glass border-r border-border/50 z-40 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <nav className="p-3 space-y-1">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => { setTab(t.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  tab === t.id ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-white/5'
                }`}
              >
                <t.icon className="h-4 w-4" />
                {t.label}
              </button>
            ))}
          </nav>
        </aside>
        {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

        <main className="flex-1 p-4 md:p-6 lg:p-8 min-h-[calc(100vh-3.5rem)] overflow-auto">
          <motion.div key={tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {tab === 'dashboard' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Leads', value: data.length, icon: Mail },
                    { label: 'Active Plans', value: data.length, icon: CreditCard },
                    { label: 'Trainers', value: data.length, icon: Dumbbell },
                    { label: 'Testimonials', value: data.length, icon: Star },
                  ].map((s) => (
                    <div key={s.label} className="glass rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{s.label}</span>
                        <s.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="text-2xl font-bold mt-2">{s.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'leads' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Leads</h2>
                  <Button variant="outline" size="sm" onClick={exportLeads} className="gap-2">
                    <Download className="h-4 w-4" /> Export CSV
                  </Button>
                </div>
                {renderTable(['Name', 'Email', 'Phone', 'Goal', 'Source', 'Date'], data)}
              </div>
            )}

            {tab === 'contacts' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Inquiries</h2>
                {renderTable(['Name', 'Email', 'Phone', 'Message', 'Date'], data)}
              </div>
            )}

            {tab === 'plans' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Membership Plans</h2>
                {renderTable(['Name', 'Price', 'Duration', 'Features'], data)}
              </div>
            )}

            {tab === 'trainers' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Trainers</h2>
                {renderTable(['Name', 'Specialization', 'Experience', 'Certifications'], data)}
              </div>
            )}

            {tab === 'gallery' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Gallery</h2>
                {renderTable(['Name', 'Weight Loss', 'Duration'], data)}
              </div>
            )}

            {tab === 'testimonials' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Testimonials</h2>
                {renderTable(['Name', 'Rating', 'Text'], data)}
              </div>
            )}

            {error && <p className="text-sm text-destructive mt-4">{error}</p>}
          </motion.div>
        </main>
      </div>
    </div>
  );

}
