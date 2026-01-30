import mongoose from 'mongoose';

const HomePageSchema = new mongoose.Schema({
  heroTitle: String,
  heroSubtitle: String,
  heroImage: String,
  aboutTitle: String,
  aboutText: String,
  aboutImage: String,
  // Gallery sections
  galleries: [{
    title: String,
    description: String,
    images: [{
      url: String,
      caption: String,
      cloudinaryPublicId: String,
    }]
  }],
  // Content blocks
  contentBlocks: [{
    title: String,
    text: String,
    imageUrl: String,
    cloudinaryPublicId: String,
    order: Number,
  }]
}, { timestamps: true });

export default mongoose.models.HomePage || mongoose.model('HomePage', HomePageSchema);
