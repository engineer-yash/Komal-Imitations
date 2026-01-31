import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';
import Image from 'next/image';
import ImageUploadWidget from '../../components/ImageUploadWidget';

export default function AdminCollections() {
  const router = useRouter();
  const [collections, setCollections] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCollection, setEditingCollection] = useState(null);
  const [activeTab, setActiveTab] = useState('youtube'); // 'youtube' or 'instagram'
  const [formData, setFormData] = useState({
    title: '',
    mediaType: 'youtube',
    mediaUrl: '',
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
      mediaType: collection.mediaType || 'youtube',
      mediaUrl: collection.mediaUrl || collection.imageUrl || '',
      imageUrl: collection.imageUrl || '',
      description: collection.description || '',
      order: collection.order || 0,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      mediaType: 'youtube',
      mediaUrl: '',
      imageUrl: '',
      description: '',
      order: 0,
    });
    setEditingCollection(null);
    setShowForm(false);
  };

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    try {
      const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
      if (shortsMatch) return shortsMatch[1];
      
      const youtubeMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
      if (youtubeMatch) return youtubeMatch[1];
      
      const watchMatch = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
      if (watchMatch) return watchMatch[1];
      
      return null;
    } catch (error) {
      return null;
    }
  };

  // Get YouTube thumbnail URL
  const getYouTubeThumbnail = (url) => {
    const videoId = getYouTubeVideoId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
  };

  // Filter collections by type
  const youtubeCollections = collections.filter(c => c.mediaType === 'youtube');
  const instagramCollections = collections.filter(c => c.mediaType === 'instagram');
  const displayCollections = activeTab === 'youtube' ? youtubeCollections : instagramCollections;

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

        {/* Tabs for YouTube and Instagram */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('youtube')}
            className={`pb-4 px-6 font-semibold transition-colors ${
              activeTab === 'youtube'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            data-testid="youtube-tab"
          >
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span>YouTube Shorts ({youtubeCollections.length})</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('instagram')}
            className={`pb-4 px-6 font-semibold transition-colors ${
              activeTab === 'instagram'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            data-testid="instagram-tab"
          >
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span>Instagram Reels ({instagramCollections.length})</span>
            </div>
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

              <div>
                <label className="block text-sm font-medium mb-2">Media Type *</label>
                <select
                  value={formData.mediaType}
                  onChange={(e) => setFormData({ ...formData, mediaType: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-sm"
                  data-testid="media-type-select"
                >
                  <option value="youtube">YouTube Shorts</option>
                  <option value="instagram">Instagram Reel</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {formData.mediaType === 'youtube' ? 'YouTube Shorts URL' : 'Instagram Reel URL'} *
                </label>
                <input
                  type="text"
                  placeholder={formData.mediaType === 'youtube' ? 'https://youtube.com/shorts/xxxxx' : 'https://www.instagram.com/reel/xxxxx/'}
                  value={formData.mediaUrl}
                  onChange={(e) => setFormData({ ...formData, mediaUrl: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-border rounded-sm"
                  data-testid="media-url-input"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.mediaType === 'youtube' 
                    ? 'Paste the full YouTube Shorts URL (e.g., https://youtube.com/shorts/abc123)'
                    : 'Paste the full Instagram Reel URL (e.g., https://www.instagram.com/reel/abc123/)'}
                </p>
              </div>

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
          {displayCollections.map((collection) => {
            const thumbnailUrl = collection.mediaType === 'youtube' 
              ? getYouTubeThumbnail(collection.mediaUrl) 
              : null;

            return (
              <div key={collection._id} className="bg-white shadow-sm overflow-hidden rounded-lg">
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                  {collection.mediaType === 'youtube' && thumbnailUrl ? (
                    <Image
                      src={thumbnailUrl}
                      alt={collection.title || 'YouTube Short'}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        // Fallback to icon if thumbnail fails to load
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  {collection.mediaType === 'youtube' && !thumbnailUrl && (
                    <div className="text-center">
                      <svg className="w-12 h-12 mx-auto text-red-600 mb-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      <p className="text-xs text-gray-600">YouTube Short</p>
                    </div>
                  )}
                  {collection.mediaType === 'instagram' && (
                    <div className="text-center">
                      <svg className="w-12 h-12 mx-auto text-pink-600 mb-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                      <p className="text-xs text-gray-600">Instagram Reel</p>
                    </div>
                  )}
                  {/* Fallback icon div (hidden by default, shown on image error) */}
                  {collection.mediaType === 'youtube' && thumbnailUrl && (
                    <div className="absolute inset-0 hidden items-center justify-center text-center">
                      <svg className="w-12 h-12 mx-auto text-red-600 mb-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      <p className="text-xs text-gray-600">YouTube Short</p>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-1 truncate">
                    {collection.title || 'Untitled'}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2">
                    {collection.mediaType === 'youtube' ? '📺 YouTube' : '📸 Instagram'}
                  </p>
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
            );
          })}
        </div>

        {displayCollections.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500">
              No {activeTab === 'youtube' ? 'YouTube Shorts' : 'Instagram Reels'} added yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
