import connectDB from '../../../lib/mongodb';
import Testimonial from '../../../models/Testimonial';
import { authMiddleware } from '../../../lib/auth';

export default async function handler(req, res) {
  await connectDB();

  // GET - Public access to fetch testimonials
  if (req.method === 'GET') {
    try {
      const { featured } = req.query;
      const query = featured === 'true' ? { featured: true } : {};
      const testimonials = await Testimonial.find(query).sort({ order: 1, createdAt: -1 });
      return res.status(200).json(testimonials);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch testimonials' });
    }
  }

  // Protected routes - require authentication
  return authMiddleware(async (req, res) => {
    // POST - Create testimonial
    if (req.method === 'POST') {
      try {
        const testimonial = await Testimonial.create(req.body);
        return res.status(201).json(testimonial);
      } catch (error) {
        return res.status(500).json({ error: 'Failed to create testimonial' });
      }
    }

    // PUT - Update testimonial
    if (req.method === 'PUT') {
      try {
        const { id, ...updateData } = req.body;
        const testimonial = await Testimonial.findByIdAndUpdate(id, updateData, { new: true });
        return res.status(200).json(testimonial);
      } catch (error) {
        return res.status(500).json({ error: 'Failed to update testimonial' });
      }
    }

    // DELETE - Delete testimonial
    if (req.method === 'DELETE') {
      try {
        const { id } = req.query;
        await Testimonial.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Testimonial deleted' });
      } catch (error) {
        return res.status(500).json({ error: 'Failed to delete testimonial' });
      }
    }

    return res.status(405).json({ error: 'Method not allowed' });
  })(req, res);
}
