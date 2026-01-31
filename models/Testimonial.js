import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  text: {
    type: String,
    required: true,
  },
  imageUrl: String,
  designation: String,
  featured: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

export default mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
