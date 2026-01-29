import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const folderName = 'komal_imitation_jewellery';
    
    // Fetch all images from the specific folder
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: folderName,
      max_results: 500,
      resource_type: 'image',
    });

    // Transform the response to include useful data
    const images = result.resources.map((image) => ({
      publicId: image.public_id,
      url: image.secure_url,
      width: image.width,
      height: image.height,
      format: image.format,
      createdAt: image.created_at,
      bytes: image.bytes,
      // Extract filename without folder path
      filename: image.public_id.split('/').pop(),
    }));

    res.status(200).json({
      success: true,
      count: images.length,
      images,
    });
  } catch (error) {
    console.error('Error fetching Cloudinary images:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch images from Cloudinary',
      details: error.message,
    });
  }
}
