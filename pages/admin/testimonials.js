import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';
import ImageUploadWidget from '../../components/ImageUploadWidget';

export default function AdminTestimonials() {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    text: '',
    imageUrl: '',
    designation: '',
    featured: false,
    order: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get('/api/testimonials');
      setTestimonials(res.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      if (editingTestimonial) {
        await axios.put('/api/testimonials', { ...formData, id: editingTestimonial._id }, config);
      } else {
        await axios.post('/api/testimonials', formData, config);
      }
      
      resetForm();
      fetchTestimonials();
      alert('Testimonial saved successfully!');
    } catch (error) {
      alert('Error saving testimonial');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this testimonial?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/testimonials?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTestimonials();
    } catch (error) {
      alert('Error deleting testimonial');
    }
  };

  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      rating: testimonial.rating,
      text: testimonial.text,
      imageUrl: testimonial.imageUrl || '',
      designation: testimonial.designation || '',
      featured: testimonial.featured || false,
      order: testimonial.order || 0,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      rating: 5,
      text: '',
      imageUrl: '',
      designation: '',
      featured: false,
      order: 0,
    });
    setEditingTestimonial(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-secondary">
      <Head>
        <title>Manage Testimonials - Admin</title>
      </Head>

      <nav className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button onClick={() => router.push('/admin/dashboard')} className="text-primary">
              ← Dashboard
            </button>
            <h1 className="text-xl font-bold font-playfair">Customer Testimonials</h1>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">All Testimonials ({testimonials.length})</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary text-white px-6 py-2 rounded-full hover:bg-[#B5952F]"
            data-testid="add-testimonial-button"
          >
            {showForm ? 'Cancel' : '+ Add Testimonial'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 mb-6 shadow-sm rounded-lg" data-testid="testimonial-form">
            <h3 className="text-xl font-semibold mb-4">
              {editingTestimonial ? 'Edit' : 'Add'} Testimonial
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Customer Name *"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="px-4 py-2 border border-border rounded-sm"
                  data-testid="testimonial-name-input"
                />
                <input
                  type="text"
                  placeholder="Designation (e.g., Verified Customer)"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  className="px-4 py-2 border border-border rounded-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Rating</label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-border rounded-sm"
                  data-testid="testimonial-rating-input"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 stars)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 stars)</option>
                  <option value={3}>⭐⭐⭐ (3 stars)</option>
                  <option value={2}>⭐⭐ (2 stars)</option>
                  <option value={1}>⭐ (1 star)</option>
                </select>
              </div>

              <textarea
                placeholder="Testimonial Text *"
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                required
                className="w-full px-4 py-2 border border-border rounded-sm"
                rows="4"
                data-testid="testimonial-text-input"
              />

              <ImageUploadWidget
                label="Customer Photo (Optional)"
                value={formData.imageUrl}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    data-testid="testimonial-featured-checkbox"
                  />
                  <span>Featured Testimonial (Show on homepage)</span>
                </label>

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
              </div>

              <button
                type="submit"
                className="bg-primary text-white px-8 py-2 rounded-full hover:bg-[#B5952F]"
                data-testid="save-testimonial-button"
              >
                {editingTestimonial ? 'Update' : 'Create'} Testimonial
              </button>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="testimonials-list">
          {testimonials.map((testimonial) => (
            <div key={testimonial._id} className="bg-white shadow-sm rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  {testimonial.imageUrl ? (
                    <img 
                      src={testimonial.imageUrl} 
                      alt={testimonial.name} 
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                    {testimonial.designation && (
                      <p className="text-sm text-gray-600">{testimonial.designation}</p>
                    )}
                    <div className="text-yellow-400 text-sm mt-1">
                      {'⭐'.repeat(testimonial.rating)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">{testimonial.text}</p>
                {testimonial.featured && (
                  <span className="inline-block bg-primary text-white text-xs px-3 py-1 rounded-full mb-3">
                    Featured
                  </span>
                )}
                <div className="flex space-x-2 pt-3 border-t border-gray-200">
                  <button
                    onClick={() => handleEdit(testimonial)}
                    className="flex-1 text-sm text-primary hover:underline"
                    data-testid={`edit-testimonial-${testimonial._id}`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(testimonial._id)}
                    className="flex-1 text-sm text-red-600 hover:underline"
                    data-testid={`delete-testimonial-${testimonial._id}`}
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
