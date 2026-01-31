import mongoose from 'mongoose';

const CollectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  mediaType: {
    type: String,
    enum: ['youtube', 'instagram', 'image'],
    default: 'image',
  },
  mediaUrl: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  cloudinaryPublicId: {
    type: String,
  },
  description: {
    type: String,
  },
  order: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

export default mongoose.models.Collection || mongoose.model('Collection', CollectionSchema);
