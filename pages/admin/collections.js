import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';
import ImageUploadWidget from '../../components/ImageUploadWidget';

export default function AdminCollections() {
  const router = useRouter();
  const [collections, setCollections] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCollection, setEditingCollection] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    description: '',
    order: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const res = await axios.get('/api/collections');
      setCollections(res.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      if (editingCollection) {
        await axios.put('/api/collections', { ...formData, id: editingCollection._id }, config);
      } else {
        await axios.post('/api/collections', formData, config);
      }
      
      resetForm();
      fetchCollections();
    } catch (error) {
      alert('Error saving collection');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this collection item?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/collections?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCollections();
    } catch (error) {
      alert('Error deleting collection');
    }
  };

  const handleEdit = (collection) => {
    setEditingCollection(collection);
    setFormData({
      title: collection.title || '',
      imageUrl: collection.imageUrl,
      description: collection.description || '',
      order: collection.order || 0,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      imageUrl: '',
      description: '',
      order: 0,
    });
    setEditingCollection(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-secondary">
      <Head>
        <title>Manage Collections - Admin</title>
      </Head>

      <nav className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button onClick={() => router.push('/admin/dashboard')} className="text-primary">
              ← Dashboard
            </button>
            <h1 className="text-xl font-bold font-playfair">Collections</h1>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">All Collections ({collections.length})</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary text-white px-6 py-2 rounded-full hover:bg-[#B5952F]"
            data-testid="add-collection-button"
          >
            {showForm ? 'Cancel' : '+ Add Collection'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 mb-6 shadow-sm" data-testid="collection-form">
            <h3 className="text-xl font-semibold mb-4">
              {editingCollection ? 'Edit' : 'Add'} Collection
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title (Optional)</label>
                <input
                  type="text"
                  placeholder="Collection Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-sm"
                  data-testid="collection-title-input"
                />
              </div>

              <ImageUploadWidget
                label="Collection Image"
                value={formData.imageUrl}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                required={true}
              />

              <div>
                <label className="block text-sm font-medium mb-2">Description (Optional)</label>
                <textarea
                  placeholder="Collection Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-sm"
                  rows="3"
                  data-testid="collection-description-input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Display Order</label>
                <input
                  type="number"
                  placeholder="0"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-border rounded-sm"
                />
              </div>

              <button
                type="submit"
                className="bg-primary text-white px-8 py-2 rounded-full hover:bg-[#B5952F]"
                data-testid="save-collection-button"
              >
                {editingCollection ? 'Update' : 'Create'} Collection
              </button>
            </form>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" data-testid="collections-list">
          {collections.map((collection) => (
            <div key={collection._id} className="bg-white shadow-sm overflow-hidden">
              <img 
                src={collection.imageUrl} 
                alt={collection.title || 'Collection'} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold mb-2 truncate">
                  {collection.title || 'Untitled'}
                </h3>
                {collection.description && (
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                    {collection.description}
                  </p>
                )}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(collection)}
                    className="flex-1 text-sm text-primary hover:underline"
                    data-testid={`edit-collection-${collection._id}`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(collection._id)}
                    className="flex-1 text-sm text-red-600 hover:underline"
                    data-testid={`delete-collection-${collection._id}`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
