import dbConnect from '../../../lib/mongodb';
import Category from '../../../models/Category';
import { authMiddleware } from '../../../lib/auth';

async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const categories = await Category.find({}).sort({ createdAt: -1 });
      return res.status(200).json(categories);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const category = await Category.create(req.body);
      return res.status(201).json(category);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { id, ...data } = req.body;
      const category = await Category.findByIdAndUpdate(id, data, { new: true });
      return res.status(200).json(category);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      await Category.findByIdAndDelete(id);
      return res.status(200).json({ message: 'Category deleted' });
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
