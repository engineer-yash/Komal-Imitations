import dbConnect from '../../../lib/mongodb';
import HomePage from '../../../models/HomePage';
import { authMiddleware } from '../../../lib/auth';

async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      let content = await HomePage.findOne({});
      // if (!content) {
      //   content = await HomePage.create({
      //     heroTitle: 'Timeless Elegance, Everyday Luxury',
      //     heroSubtitle: 'Discover exquisite imitation jewellery that captures the essence of tradition with modern craftsmanship',
      //     heroImage: 'https://images.unsplash.com/photo-1737515046830-1680d82e043c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODR8MHwxfHNlYXJjaHwzfHxpbmRpYW4lMjBtb2RlbCUyMHdlYXJpbmclMjBoZWF2eSUyMGdvbGQlMjBqZXdlbGxlcnklMjBwb3J0cmFpdCUyMGx1eHVyeXxlbnwwfHx8fDE3Njk2ODQ1MTR8MA&ixlib=rb-4.1.0&q=85',
      //     aboutTitle: 'Crafted with Passion in Pune',
      //     aboutText: 'Located in the heart of Raviwar Peth, Pune, Komal Imitation Jewellery has been serving customers with beautiful, affordable jewellery since our inception. Our collection blends traditional designs with contemporary styles, perfect for weddings, festivals, and everyday elegance.',
      //     aboutImage: 'https://images.unsplash.com/photo-1744196988043-78466f6ed98a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwyfHxpbmRpYW4lMjBqZXdlbGxlcnklMjBjcmFmdHNtYW4lMjB3b3JraW5nJTIwY2xvc2UlMjB1cHxlbnwwfHx8fDE3Njk2ODQ1Mzl8MA&ixlib=rb-4.1.0&q=85',
      //   });
      // }
      return res.status(200).json(content);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method === 'PUT') {
    try {
      let content = await HomePage.findOne({});
      if (!content) {
        content = await HomePage.create(req.body);
      } else {
        content = await HomePage.findByIdAndUpdate(content._id, req.body, { new: true });
      }
      return res.status(200).json(content);
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
