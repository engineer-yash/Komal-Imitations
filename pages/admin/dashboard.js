import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import axios from 'axios';

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    messages: 0,
    collections: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    // Fetch fresh stats on every mount
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const [products, categories, messages, collections] = await Promise.all([
        axios.get('/api/products', config),
        axios.get('/api/categories', config),
        axios.get('/api/contact', config),
        axios.get('/api/collections', config),
      ]);

      setStats({
        products: products.data.length,
        categories: categories.data.length,
        messages: messages.data.filter(m => m.status === 'new').length,
        collections: collections.data.length,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/admin/login');
  };

  const menuItems = [
    { name: 'Products', href: '/admin/products', icon: '💎' },
    { name: 'Categories', href: '/admin/categories', icon: '📊' },
    { name: 'Collections', href: '/admin/collections', icon: '🖼️' },
    { name: 'Testimonials', href: '/admin/testimonials', icon: '⭐' },
    { name: 'Messages', href: '/admin/messages', icon: '✉️' },
    { name: 'Homepage', href: '/admin/homepage', icon: '🏠' },
    { name: 'Delete Images', href: '/admin/cloudinary-import', icon: '🗑️' },
  ];

  return (
    <div className="min-h-screen bg-secondary">
      <Head>
        <title>Admin Dashboard - Komal Jewellery</title>
      </Head>

      <nav className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold font-playfair text-primary">Admin Panel</h1>
            <button
              onClick={handleLogout}
              className="text-sm text-muted-foreground hover:text-primary"
              data-testid="logout-button"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold font-playfair mb-8">Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12" data-testid="stats-grid">
          <div className="bg-white p-6 shadow-sm">
            <div className="text-3xl mb-2">💎</div>
            <p className="text-sm text-muted-foreground mb-1">Products</p>
            <p className="text-3xl font-bold">{stats.products}</p>
          </div>
          <div className="bg-white p-6 shadow-sm">
            <div className="text-3xl mb-2">📊</div>
            <p className="text-sm text-muted-foreground mb-1">Categories</p>
            <p className="text-3xl font-bold">{stats.categories}</p>
          </div>
          <div className="bg-white p-6 shadow-sm">
            <div className="text-3xl mb-2">✉️</div>
            <p className="text-sm text-muted-foreground mb-1">New Messages</p>
            <p className="text-3xl font-bold">{stats.messages}</p>
          </div>
          <div className="bg-white p-6 shadow-sm">
            <div className="text-3xl mb-2">🖼️</div>
            <p className="text-sm text-muted-foreground mb-1">Collections</p>
            <p className="text-3xl font-bold">{stats.collections}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-testid="menu-grid">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="bg-white p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              data-testid={`menu-${item.name.toLowerCase()}`}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold font-playfair">{item.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
