import mongoose from 'mongoose';

const HomePageSchema = new mongoose.Schema({
  heroTitle: String,
  heroSubtitle: String,
  heroImage: String,
  aboutTitle: String,
  aboutText: String,
  aboutImage: String,
  aboutImage2: String,
  aboutText2: String,
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
  }],
  // Trust badges
  trustBadges: [{
    icon: String,
    title: String,
    description: String,
    order: Number,
  }],
  // Why Choose Us
  whyChooseUs: [{
    icon: String,
    title: String,
    description: String,
    order: Number,
  }],
  // Newsletter section
  newsletterTitle: String,
  newsletterSubtitle: String,
  newsletterEnabled: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export default mongoose.models.HomePage || mongoose.model('HomePage', HomePageSchema);
