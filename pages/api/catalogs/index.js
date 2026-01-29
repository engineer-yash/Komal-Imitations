import dbConnect from '../../../lib/mongodb';
import Catalog from '../../../models/Catalog';
import { authMiddleware } from '../../../lib/auth';

async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const catalogs = await Catalog.find({}).sort({ createdAt: -1 });
      return res.status(200).json(catalogs);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const catalog = await Catalog.create(req.body);
      return res.status(201).json(catalog);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      await Catalog.findByIdAndDelete(id);
      return res.status(200).json({ message: 'Catalog deleted' });
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
