import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';
import ImageUploadWidget from '../../components/ImageUploadWidget';

export default function AdminHomepage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    heroTitle: '',
    heroSubtitle: '',
    heroImage: '',
    aboutTitle: '',
    aboutText: '',
    aboutImage: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/homepage', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFormData(res.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put('/api/homepage', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Homepage content updated successfully!');
    } catch (error) {
      alert('Error updating content');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-secondary">
      <Head>
        <title>Homepage Settings - Admin</title>
      </Head>

      <nav className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button onClick={() => router.push('/admin/dashboard')} className="text-primary">← Dashboard</button>
            <h1 className="text-xl font-bold font-playfair">Homepage Settings</h1>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6" data-testid="homepage-form">
            <div>
              <h3 className="text-xl font-semibold mb-4">Hero Section</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Hero Title"
                  value={formData.heroTitle}
                  onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-sm"
                  data-testid="hero-title-input"
                />
                <textarea
                  placeholder="Hero Subtitle"
                  value={formData.heroSubtitle}
                  onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-sm"
                  rows="3"
                />
                <ImageUploadWidget
                  label="Hero Background Image"
                  value={formData.heroImage}
                  onChange={(url) => setFormData({ ...formData, heroImage: url })}
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">About Section</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="About Title"
                  value={formData.aboutTitle}
                  onChange={(e) => setFormData({ ...formData, aboutTitle: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-sm"
                />
                <textarea
                  placeholder="About Text"
                  value={formData.aboutText}
                  onChange={(e) => setFormData({ ...formData, aboutText: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-sm"
                  rows="5"
                />
                <ImageUploadWidget
                  label="About Section Image"
                  value={formData.aboutImage}
                  onChange={(url) => setFormData({ ...formData, aboutImage: url })}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white px-8 py-3 rounded-full hover:bg-[#B5952F]"
              data-testid="save-homepage-button"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
