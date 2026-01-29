import dbConnect from '../../../lib/mongodb';
import Product from '../../../models/Product';
import { authMiddleware } from '../../../lib/auth';

async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const { category, gender, minPrice, maxPrice, featured } = req.query;
      let filter = {};

      if (category) filter.categoryId = category;
      if (gender) filter.gender = gender;
      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = parseFloat(minPrice);
        if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
      }
      if (featured) filter.featured = featured === 'true';

      const products = await Product.find(filter)
        .populate('categoryId')
        .sort({ createdAt: -1 });
      
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const product = await Product.create(req.body);
      return res.status(201).json(product);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { id, ...data } = req.body;
      const product = await Product.findByIdAndUpdate(id, data, { new: true });
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      await Product.findByIdAndDelete(id);
      return res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}

export default function(req, res) {
  if (req.method === 'GET') {
    return handler(req, res);
  }
  return authMiddleware(handler)(req, res);
}
