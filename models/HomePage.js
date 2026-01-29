import mongoose from 'mongoose';

const HomePageSchema = new mongoose.Schema({
  heroTitle: String,
  heroSubtitle: String,
  heroImage: String,
  aboutTitle: String,
  aboutText: String,
  aboutImage: String,
}, { timestamps: true });

export default mongoose.models.HomePage || mongoose.model('HomePage', HomePageSchema);
