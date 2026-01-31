import mongoose from 'mongoose';

const CatalogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  fileUrl: {
    type: String,
    required: true,
  },
  thumbnailUrl: String,
}, { timestamps: true });

export default mongoose.models.Catalog || mongoose.model('Catalog', CatalogSchema);
