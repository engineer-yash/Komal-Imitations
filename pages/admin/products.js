import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';

export default function AdminProducts() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    imageUrl: '',
    price: '',
    size: '',
    gender: 'Unisex',
    description: '',
    featured: false,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const [productsRes, categoriesRes] = await Promise.all([
        axios.get('/api/products', config),
        axios.get('/api/categories', config),
      ]);
      setProducts(productsRes.data);
      setCategories(categoriesRes.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      // Get upload signature
      const signatureRes = await axios.post('/api/cloudinary/upload-signature', {
        folder: 'Home/komal_imitation_jewellery'
      });

      // Upload to Cloudinary
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('api_key', signatureRes.data.apiKey);
      uploadFormData.append('timestamp', signatureRes.data.timestamp);
      uploadFormData.append('signature', signatureRes.data.signature);
      uploadFormData.append('folder', signatureRes.data.folder);

      const uploadRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${signatureRes.data.cloudName}/image/upload`,
        uploadFormData
      );

      setFormData(prev => ({
        ...prev,
        imageUrl: uploadRes.data.secure_url,
        cloudinaryPublicId: uploadRes.data.public_id
      }));
      
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      if (editingProduct) {
        await axios.put('/api/products', { ...formData, id: editingProduct._id }, config);
      } else {
        await axios.post('/api/products', formData, config);
      }
      
      resetForm();
      fetchData();
    } catch (error) {
      alert('Error saving product');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/products?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (error) {
      alert('Error deleting product');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      categoryId: product.categoryId._id || product.categoryId,
      imageUrl: product.imageUrl,
      price: product.price,
      size: product.size || '',
      gender: product.gender,
      description: product.description || '',
      featured: product.featured || false,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      categoryId: '',
      imageUrl: '',
      price: '',
      size: '',
      gender: 'Unisex',
      description: '',
      featured: false,
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-secondary">
      <Head>
        <title>Manage Products - Admin</title>
      </Head>

      <nav className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button onClick={() => router.push('/admin/dashboard')} className="text-primary">← Dashboard</button>
            <h1 className="text-xl font-bold font-playfair">Products</h1>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">All Products ({products.length})</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary text-white px-6 py-2 rounded-full hover:bg-[#B5952F]"
            data-testid="add-product-button"
          >
            {showForm ? 'Cancel' : '+ Add Product'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 mb-6 shadow-sm" data-testid="product-form">
            <h3 className="text-xl font-semibold mb-4">{editingProduct ? 'Edit' : 'Add'} Product</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Product Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="px-4 py-2 border border-border rounded-sm"
                  data-testid="product-name-input"
                />
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  required
                  className="px-4 py-2 border border-border rounded-sm"
                  data-testid="product-category-input"
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Upload Image from Device</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={uploading}
                    className="w-full px-4 py-2 border border-border rounded-sm"
                    data-testid="product-image-upload"
                  />
                  {uploading && (
                    <p className="text-sm text-primary mt-1">Uploading to Cloudinary...</p>
                  )}
                </div>
                
                <input
                  type="text"
                  placeholder="Or Enter Image URL"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  required
                  className="px-4 py-2 border border-border rounded-sm"
                  data-testid="product-image-input"
                />
                {formData.imageUrl && (
                  <img 
                    src={formData.imageUrl} 
                    alt="Preview" 
                    className="col-span-2 h-32 object-cover rounded"
                  />
                )}
                <input
                  type="number"
                  placeholder="Price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                  className="px-4 py-2 border border-border rounded-sm"
                  data-testid="product-price-input"
                />
                <input
                  type="text"
                  placeholder="Size (optional)"
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  className="px-4 py-2 border border-border rounded-sm"
                />
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="px-4 py-2 border border-border rounded-sm"
                  data-testid="product-gender-input"
                >
                  <option value="Unisex">Unisex</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
              </div>
              <textarea
                placeholder="Description (optional)"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-sm"
                rows="3"
              />
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  data-testid="product-featured-checkbox"
                />
                <span>Featured Product</span>
              </label>
              <button
                type="submit"
                className="bg-primary text-white px-8 py-2 rounded-full hover:bg-[#B5952F]"
                data-testid="save-product-button"
              >
                {editingProduct ? 'Update' : 'Create'} Product
              </button>
            </form>
          </div>
        )}

        <div className="bg-white shadow-sm overflow-x-auto" data-testid="products-list">
          <table className="min-w-[800px] divide-y divide-border">
            <thead className="bg-secondary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="px-6 py-4">
                    <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover" />
                  </td>
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4">{product.categoryId?.name || 'N/A'}</td>
                  <td className="px-6 py-4">₹{product.price}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-primary hover:underline"
                      data-testid={`edit-product-${product._id}`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-600 hover:underline"
                      data-testid={`delete-product-${product._id}`}
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
