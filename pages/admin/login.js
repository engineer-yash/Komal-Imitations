import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';

export default function AdminLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      router.push('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary">
      <Head>
        <title>Admin Login - Komal Jewellery</title>
      </Head>

      <div className="max-w-md w-full bg-white p-8 shadow-lg" data-testid="admin-login-page">
        <h1 className="text-3xl font-bold font-playfair text-center mb-8">Admin Login</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full bg-secondary border border-transparent focus:border-primary focus:ring-2 focus:ring-primary rounded-sm px-4 py-3 outline-none"
              data-testid="admin-email-input"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="w-full bg-secondary border border-transparent focus:border-primary focus:ring-2 focus:ring-primary rounded-sm px-4 py-3 outline-none"
              data-testid="admin-password-input"
            />
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-800 rounded-sm text-sm" data-testid="login-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white hover:bg-[#B5952F] rounded-full px-8 py-3 transition-all duration-300 disabled:opacity-50"
            data-testid="admin-login-button"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
