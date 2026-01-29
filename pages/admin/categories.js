import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';

export default function AdminCategories() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', slug: '', description: '', imageUrl: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/categories', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCategories(res.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      if (editingCategory) {
        await axios.put('/api/categories', { ...formData, id: editingCategory._id }, config);
      } else {
        await axios.post('/api/categories', formData, config);
      }
      
      resetForm();
      fetchCategories();
    } catch (error) {
      alert('Error saving category');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this category?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/categories?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCategories();
    } catch (error) {
      alert('Error deleting category');
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      imageUrl: category.imageUrl || '',
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ name: '', slug: '', description: '', imageUrl: '' });
    setEditingCategory(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-secondary">
      <Head>
        <title>Manage Categories - Admin</title>
      </Head>

      <nav className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button onClick={() => router.push('/admin/dashboard')} className="text-primary">← Dashboard</button>
            <h1 className="text-xl font-bold font-playfair">Categories</h1>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">All Categories ({categories.length})</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary text-white px-6 py-2 rounded-full hover:bg-[#B5952F]"
            data-testid="add-category-button"
          >
            {showForm ? 'Cancel' : '+ Add Category'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 mb-6 shadow-sm" data-testid="category-form">
            <h3 className="text-xl font-semibold mb-4">{editingCategory ? 'Edit' : 'Add'} Category</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Category Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="px-4 py-2 border border-border rounded-sm"
                  data-testid="category-name-input"
                />
                <input
                  type="text"
                  placeholder="Slug (e.g., necklaces)"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  required
                  className="px-4 py-2 border border-border rounded-sm"
                  data-testid="category-slug-input"
                />
              </div>
              <input
                type="text"
                placeholder="Image URL (optional)"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-sm"
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
                data-testid="save-category-button"
              >
                {editingCategory ? 'Update' : 'Create'} Category
              </button>
            </form>
          </div>
        )}

        <div className="bg-white shadow-sm overflow-hidden" data-testid="categories-list">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-secondary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Slug</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {categories.map((category) => (
                <tr key={category._id}>
                  <td className="px-6 py-4">{category.name}</td>
                  <td className="px-6 py-4">{category.slug}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="text-primary hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(category._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
