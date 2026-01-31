import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function CloudinaryDelete() {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
    }
  }, [router]);

  const fetchImages = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('/api/cloudinary/fetch-images');
      setImages(res.data.images);
      setSuccess(`Found ${res.data.count} images from Cloudinary`);
    } catch (err) {
      setError('Failed to fetch images: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  const toggleImageSelection = (publicId) => {
    setSelectedImages((prev) =>
      prev.includes(publicId)
        ? prev.filter((id) => id !== publicId)
        : [...prev, publicId]
    );
  };

  const selectAll = () => {
    setSelectedImages(images.map((img) => img.publicId));
  };

  const deselectAll = () => {
    setSelectedImages([]);
  };

  const deleteSelectedImages = async () => {
    if (selectedImages.length === 0) {
      setError('Please select images to delete');
      return;
    }

    if (!confirm(`Are you sure you want to delete ${selectedImages.length} images? This will also delete any products using these images.`)) {
      return;
    }

    setDeleting(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const imagesToDelete = images.filter((img) =>
        selectedImages.includes(img.publicId)
      );

      const res = await axios.post('/api/cloudinary/delete-images', {
        images: imagesToDelete,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setSuccess(`✅ Successfully deleted ${res.data.deleted} images from Cloudinary and ${res.data.productsDeleted} products from database!`);
      setSelectedImages([]);
      
      // Refresh the images list
      fetchImages();

      if (res.data.errors.length > 0) {
        setError(`⚠️ ${res.data.errors.length} images failed to delete`);
      }
    } catch (err) {
      setError('Failed to delete images: ' + (err.response?.data?.error || err.message));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Delete Cloudinary Images - Admin</title>
      </Head>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold font-playfair" data-testid="page-title">
            Delete Cloudinary Images
          </h1>
          <button
            onClick={() => router.push('/admin/dashboard')}
            className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded"
            data-testid="back-button"
          >
            ← Back to Dashboard
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-4" data-testid="error-message">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded mb-4" data-testid="success-message">
            {success}
          </div>
        )}

        {/* Fetch Images Section */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Step 1: Fetch Images from Cloudinary</h2>
          <p className="text-gray-600 mb-4">
            Fetch all images from the "komal_imitation_jewellery" folder
          </p>
          <button
            onClick={fetchImages}
            disabled={loading}
            className="bg-primary text-white px-6 py-3 rounded hover:bg-[#B5952F] disabled:opacity-50"
            data-testid="fetch-images-button"
          >
            {loading ? 'Fetching...' : 'Fetch Images'}
          </button>
        </div>

        {/* Images Grid */}
        {images.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <h2 className="text-xl font-semibold">
                Step 2: Select Images to Delete ({selectedImages.length} selected)
              </h2>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={selectAll}
                  className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded"
                  data-testid="select-all-button"
                >
                  Select All
                </button>
                <button
                  onClick={deselectAll}
                  className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded"
                  data-testid="deselect-all-button"
                >
                  Deselect All
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4" data-testid="images-grid">
              {images.map((image) => (
                <div
                  key={image.publicId}
                  onClick={() => toggleImageSelection(image.publicId)}
                  className={`relative cursor-pointer border-4 transition-all rounded-lg overflow-hidden ${
                    selectedImages.includes(image.publicId)
                      ? 'border-red-500 ring-2 ring-red-300'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                  data-testid={`image-${image.publicId}`}
                >
                  <div className="relative h-40">
                    <Image
                      src={image.url}
                      alt={image.filename}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {selectedImages.includes(image.publicId) && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold">
                      ✓
                    </div>
                  )}
                  <p className="text-xs text-center p-1 bg-gray-100 truncate">
                    {image.filename}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={deleteSelectedImages}
                disabled={deleting || selectedImages.length === 0}
                className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 disabled:opacity-50 font-semibold"
                data-testid="delete-button"
              >
                {deleting ? '🗑️ Deleting...' : `🗑️ Delete ${selectedImages.length} Selected Images`}
              </button>
            </div>

            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-sm text-yellow-800">
                <strong>⚠️ Warning:</strong> This action will permanently delete selected images from Cloudinary 
                AND any products in your database that use these images. This cannot be undone.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
