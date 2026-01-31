import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';
import ImageUploadWidget from '../../components/ImageUploadWidget';

export default function AdminCatalogs() {
  const router = useRouter();
  const [catalogs, setCatalogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', fileUrl: '', thumbnailUrl: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetchCatalogs();
  }, []);

  const fetchCatalogs = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/catalogs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCatalogs(res.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/catalogs', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      resetForm();
      fetchCatalogs();
    } catch (error) {
      alert('Error saving catalog');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this catalog?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/catalogs?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCatalogs();
    } catch (error) {
      alert('Error deleting catalog');
    }
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', fileUrl: '', thumbnailUrl: '' });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-secondary">
      <Head>
        <title>Manage Catalogs - Admin</title>
      </Head>

      <nav className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button onClick={() => router.push('/admin/dashboard')} className="text-primary">← Dashboard</button>
            <h1 className="text-xl font-bold font-playfair">Catalogs</h1>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">All Catalogs ({catalogs.length})</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary text-white px-6 py-2 rounded-full hover:bg-[#B5952F]"
            data-testid="add-catalog-button"
          >
            {showForm ? 'Cancel' : '+ Add Catalog'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 mb-6 shadow-sm" data-testid="catalog-form">
            <h3 className="text-xl font-semibold mb-4">Add Catalog</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Catalog Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full px-4 py-2 border border-border rounded-sm"
                data-testid="catalog-title-input"
              />
              <input
                type="text"
                placeholder="File URL (PDF or image)"
                value={formData.fileUrl}
                onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                required
                className="w-full px-4 py-2 border border-border rounded-sm"
                data-testid="catalog-file-input"
              />
              <ImageUploadWidget
                label="Catalog Thumbnail Image"
                value={formData.thumbnailUrl}
                onChange={(url) => setFormData({ ...formData, thumbnailUrl: url })}
              />
              <textarea
                placeholder="Description (optional)"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-sm"
                rows="3"
              />
              <button
                type="submit"
                className="bg-primary text-white px-8 py-2 rounded-full hover:bg-[#B5952F]"
                data-testid="save-catalog-button"
              >
                Add Catalog
              </button>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-testid="catalogs-grid">
          {catalogs.map((catalog) => (
            <div key={catalog._id} className="bg-white p-6 shadow-sm">
              {catalog.thumbnailUrl && (
                <img src={catalog.thumbnailUrl} alt={catalog.title} className="w-full h-48 object-cover mb-4" />
              )}
              <h3 className="font-semibold mb-2">{catalog.title}</h3>
              {catalog.description && <p className="text-sm text-muted-foreground mb-4">{catalog.description}</p>}
              <div className="flex space-x-2">
                <a
                  href={catalog.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  View
                </a>
                <button
                  onClick={() => handleDelete(catalog._id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
