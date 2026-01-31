import { v2 as cloudinary } from 'cloudinary';
import dbConnect from '../../../lib/mongodb';
import Product from '../../../models/Product';
import { authMiddleware } from '../../../lib/auth';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  await dbConnect();

  try {
    const { images } = req.body;

    if (!images || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ error: 'No images provided' });
    }

    const results = {
      deleted: 0,
      productsDeleted: 0,
      errors: [],
    };

    for (const image of images) {
      try {
        // Delete from Cloudinary
        await cloudinary.uploader.destroy(image.publicId);
        results.deleted++;

        // Delete products using this image
        const deleteResult = await Product.deleteMany({ imageUrl: image.url });
        results.productsDeleted += deleteResult.deletedCount;

      } catch (error) {
        console.error(`Error deleting image ${image.publicId}:`, error);
        results.errors.push({
          publicId: image.publicId,
          error: error.message,
        });
      }
    }

    res.status(200).json({
      success: true,
      deleted: results.deleted,
      productsDeleted: results.productsDeleted,
      errors: results.errors,
    });
  } catch (error) {
    console.error('Error in delete-images handler:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete images',
      details: error.message,
    });
  }
}

export default function(req, res) {
  return authMiddleware(handler)(req, res);
}
