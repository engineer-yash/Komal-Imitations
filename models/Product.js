import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  cloudinaryPublicId: {
    type: String,
  },
  price: {
    type: Number,
    required: false,
  },
  size: String,
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Unisex'],
    default: 'Unisex',
  },
  description: String,
  featured: {
    type: Boolean,
    default: false,
  },
  aiGenerated: {
    type: Boolean,
    default: false,
  },
  features: {
    type: [String],
    default: [],
  },
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
