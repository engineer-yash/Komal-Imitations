import dbConnect from '../../../lib/mongodb';
import ContactMessage from '../../../models/ContactMessage';
import { authMiddleware } from '../../../lib/auth';

async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const messages = await ContactMessage.find({}).sort({ createdAt: -1 });
      return res.status(200).json(messages);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const message = await ContactMessage.create(req.body);
      return res.status(201).json(message);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { id, status } = req.body;
      const message = await ContactMessage.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
      return res.status(200).json(message);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}

export default function(req, res) {
  if (req.method === 'POST') {
    return handler(req, res);
  }
  return authMiddleware(handler)(req, res);
}
