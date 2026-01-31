import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function ImageUploadWidget({ 
  value, 
  onChange, 
  label = "Image", 
  folder = "Home/komal_imitation_jewellery",
  required = false 
}) {
  const [uploading, setUploading] = useState(false);
  const [showBrowser, setShowBrowser] = useState(false);
  const [cloudinaryImages, setCloudinaryImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // Get upload signature
      const signatureRes = await axios.post('/api/cloudinary/upload-signature', {
        folder: folder
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

      // Set the image URL immediately to show preview
      const imageUrl = uploadRes.data.secure_url;
      onChange(imageUrl);
      
      // Show success message after state update
      setTimeout(() => {
        alert('✅ Image uploaded successfully!');
      }, 100);
    } catch (error) {
      console.error('Upload error:', error);
      alert('❌ Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
      // Reset the file input to allow selecting the same file again if needed
      e.target.value = '';
    }
  };

  const fetchCloudinaryImages = async () => {
    setLoadingImages(true);
    try {
      const res = await axios.get('/api/cloudinary/fetch-images');
      setCloudinaryImages(res.data.images || []);
      setShowBrowser(true);
    } catch (error) {
      console.error('Error fetching images:', error);
      alert('Failed to fetch Cloudinary images. Please ensure you are logged in.');
    } finally {
      setLoadingImages(false);
    }
  };

  const selectCloudinaryImage = (imageUrl) => {
    onChange(imageUrl);
    setShowBrowser(false);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Upload from device */}
      <div className="flex items-center space-x-2">
        <label className="flex-1">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
            id={`file-upload-${label.replace(/\s+/g, '-')}`}
          />
          <div 
            className={`w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-primary transition-colors ${
              uploading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {uploading ? (
              <span className="text-primary">📤 Uploading...</span>
            ) : (
              <span className="text-gray-600 cursor-pointer" onClick={() => !uploading && document.getElementById(`file-upload-${label.replace(/\s+/g, '-')}`).click()}>
                📁 Upload from Device
              </span>
            )}
          </div>
        </label>

        {/* Browse Cloudinary button */}
        <button
          type="button"
          onClick={fetchCloudinaryImages}
          disabled={loadingImages || uploading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          {loadingImages ? '⏳ Loading...' : '🖼️ Browse'}
        </button>
      </div>

      {/* Manual URL input */}
      <input
        type="text"
        placeholder="Or paste image URL directly"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        required={required && !value}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
      />

      {/* Image preview */}
      {value && (
        <div className="relative w-full h-48 border border-gray-200 rounded-lg overflow-hidden">
          <Image
            src={value}
            alt="Preview"
            fill
            className="object-cover"
          />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            ×
          </button>
        </div>
      )}

      {/* Cloudinary Image Browser Modal */}
      <AnimatePresence>
        {showBrowser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowBrowser(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-xl font-semibold">Select Image from Cloudinary</h3>
                <button
                  onClick={() => setShowBrowser(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[calc(80vh-140px)]">
                {cloudinaryImages.length === 0 ? (
                  <p className="text-center text-gray-500">No images found in Cloudinary</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {cloudinaryImages.map((image) => (
                      <motion.div
                        key={image.publicId}
                        whileHover={{ scale: 1.05 }}
                        className="relative h-40 cursor-pointer border-4 border-transparent hover:border-primary transition-all rounded-lg overflow-hidden"
                        onClick={() => selectCloudinaryImage(image.url)}
                      >
                        <Image
                          src={image.url}
                          alt={image.filename}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                          <p className="text-white text-xs truncate">{image.filename}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <p className="text-sm text-gray-600">
                  Click on an image to select it, or close this dialog to cancel
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
