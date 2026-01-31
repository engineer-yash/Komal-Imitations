import dbConnect from '../../../lib/mongodb';
import Collection from '../../../models/Collection';
import { verifyToken } from '../../../lib/auth';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const collections = await Collection.find().sort({ order: 1, createdAt: -1 });
      res.status(200).json(collections);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch collections' });
    }
  } else if (req.method === 'POST') {
    try {
      verifyToken(req);
      const collection = await Collection.create(req.body);
      res.status(201).json(collection);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create collection' });
    }
  } else if (req.method === 'PUT') {
    try {
      verifyToken(req);
      const { id, ...data } = req.body;
      const collection = await Collection.findByIdAndUpdate(id, data, { new: true });
      res.status(200).json(collection);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update collection' });
    }
  } else if (req.method === 'DELETE') {
    try {
      verifyToken(req);
      const { id } = req.query;
      await Collection.findByIdAndDelete(id);
      res.status(200).json({ message: 'Collection deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete collection' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
