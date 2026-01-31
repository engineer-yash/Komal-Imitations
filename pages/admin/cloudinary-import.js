import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function CloudinaryImport() {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState([]);
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
      setError('Failed to fetch images: ' + err.response?.data?.error || err.message);
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

  const analyzeImages = async (autoImport = false) => {
    if (selectedImages.length === 0) {
      setError('Please select images to analyze');
      return;
    }

    setAnalyzing(true);
    setError('');
    setSuccess('');

    try {
      const imagesToAnalyze = images.filter((img) =>
        selectedImages.includes(img.publicId)
      );

      const res = await axios.post('/api/cloudinary/analyze-and-import', {
        images: imagesToAnalyze,
        autoImport,
      });

      if (autoImport) {
        setSuccess(`Successfully imported ${res.data.analyzed} products!`);
        setSelectedImages([]);
        setAnalyzed([]);
      } else {
        setAnalyzed(res.data.results);
        setSuccess(`Analyzed ${res.data.analyzed} images. Review and import below.`);
      }

      if (res.data.errors.length > 0) {
        setError(`${res.data.errors.length} images failed to analyze`);
      }
    } catch (err) {
      setError('Failed to analyze images: ' + err.response?.data?.error || err.message);
    } finally {
      setAnalyzing(false);
    }
  };

  const importAnalyzed = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const promises = analyzed.map((item) =>
        axios.post('/api/products', item.productData, {
          headers: { Authorization: `Bearer ${token}` },
        })
      );

      await Promise.all(promises);
      setSuccess(`Successfully imported ${analyzed.length} products!`);
      setAnalyzed([]);
      setSelectedImages([]);
    } catch (err) {
      setError('Failed to import products: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Cloudinary Import - Admin</title>
      </Head>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold font-playfair" data-testid="page-title">
            Import from Cloudinary
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
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                Step 2: Select Images ({selectedImages.length} selected)
              </h2>
              <div className="space-x-2">
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
                  className={`relative cursor-pointer border-4 transition-all ${
                    selectedImages.includes(image.publicId)
                      ? 'border-primary'
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
                    <div className="absolute top-2 right-2 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center">
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
                onClick={() => analyzeImages(false)}
                disabled={analyzing || selectedImages.length === 0}
                className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 disabled:opacity-50"
                data-testid="analyze-button"
              >
                {analyzing ? 'Analyzing...' : 'Analyze Selected Images'}
              </button>
              <button
                onClick={() => analyzeImages(true)}
                disabled={analyzing || selectedImages.length === 0}
                className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 disabled:opacity-50"
                data-testid="auto-import-button"
              >
                {analyzing ? 'Processing...' : 'Analyze & Auto-Import'}
              </button>
            </div>
          </div>
        )}

        {/* Analyzed Results */}
        {analyzed.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Step 3: Review & Import</h2>
              <button
                onClick={importAnalyzed}
                disabled={loading}
                className="bg-primary text-white px-6 py-3 rounded hover:bg-[#B5952F] disabled:opacity-50"
                data-testid="import-analyzed-button"
              >
                {loading ? 'Importing...' : `Import ${analyzed.length} Products`}
              </button>
            </div>

            <div className="space-y-6" data-testid="analyzed-results">
              {analyzed.map((item, index) => (
                <div key={index} className="border p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative h-48">
                      <Image
                        src={item.imageInfo.url}
                        alt={item.productData.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <h3 className="text-lg font-semibold mb-2">
                        {item.productData.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {item.productData.description}
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="font-semibold">Category:</span>{' '}
                          {item.analysis.category}
                        </div>
                        <div>
                          <span className="font-semibold">Price:</span> ₹
                          {item.productData.price}
                        </div>
                        <div>
                          <span className="font-semibold">Gender:</span>{' '}
                          {item.productData.gender}
                        </div>
                        <div>
                          <span className="font-semibold">Size:</span>{' '}
                          {item.productData.size}
                        </div>
                      </div>
                      {item.productData.features?.length > 0 && (
                        <div className="mt-2">
                          <span className="font-semibold text-sm">Features:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {item.productData.features.map((feature, i) => (
                              <span
                                key={i}
                                className="bg-gray-100 text-xs px-2 py-1 rounded"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
