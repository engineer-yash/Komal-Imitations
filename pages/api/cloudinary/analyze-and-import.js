import dbConnect from '../../../lib/mongodb';
import Product from '../../../models/Product';
import Category from '../../../models/Category';
import OpenAI from 'openai';

// Initialize OpenAI with Emergent LLM key
const openai = new OpenAI({
  apiKey: process.env.EMERGENT_LLM_KEY,
  baseURL: 'https://api.emergentmethods.ai/v1',
});

// Helper function to analyze image using OpenAI Vision
async function analyzeImage(imageUrl) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-5.2',
      messages: [
        {
          role: 'system',
          content: `You are an expert jewellery analyst. Analyze the jewellery image and provide structured data in JSON format.
Categories: Necklaces, Earrings, Bangles, Rings, Bracelets, Anklets, Maang Tikka, Nose Ring, Chains, Sets
Gender: Male, Female, Unisex
Provide the following fields:
- name: A descriptive product name (e.g., "Golden Floral Necklace Set")
- description: Detailed description (50-100 words)
- category: One of the predefined categories
- gender: Male, Female, or Unisex
- estimatedPrice: Price in INR (be realistic for imitation jewellery, typically 200-5000 INR)
- size: If visible (e.g., "Medium", "Adjustable", "Standard")
- features: Array of key features (e.g., ["Gold-plated", "Kundan work", "Bridal collection"])

Return ONLY valid JSON, no additional text.`,
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Analyze this jewellery image and provide structured product data.',
            },
            {
              type: 'image_url',
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
      max_tokens: 500,
      temperature: 0.3,
    });

    const content = response.choices[0].message.content;
    // Parse JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('Failed to parse JSON from AI response');
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const { images, autoImport = false } = req.body;

    if (!images || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({
        error: 'Please provide an array of images to analyze',
      });
    }

    const results = [];
    const errors = [];

    // Get all categories for mapping
    const categories = await Category.find({});
    const categoryMap = {};
    categories.forEach((cat) => {
      categoryMap[cat.name.toLowerCase()] = cat._id;
    });

    for (const image of images) {
      try {
        // Analyze image with AI
        const analysis = await analyzeImage(image.url);

        // Find matching category
        let categoryId = null;
        if (analysis.category) {
          const categoryName = analysis.category.toLowerCase();
          categoryId = categoryMap[categoryName] || categoryMap[Object.keys(categoryMap).find(key => categoryName.includes(key))];
        }

        // Prepare product data
        const productData = {
          name: analysis.name || `Product ${image.filename}`,
          description: analysis.description || '',
          imageUrl: image.url,
          cloudinaryPublicId: image.publicId,
          price: analysis.estimatedPrice || 999,
          categoryId: categoryId || categories[0]?._id, // Default to first category if no match
          gender: analysis.gender || 'Unisex',
          size: analysis.size || 'Standard',
          featured: false,
          aiGenerated: true,
          features: analysis.features || [],
        };

        if (autoImport) {
          // Automatically save to database
          const product = await Product.create(productData);
          results.push({
            success: true,
            product,
            analysis,
          });
        } else {
          // Just return analysis for manual review
          results.push({
            success: true,
            productData,
            analysis,
            imageInfo: image,
          });
        }
      } catch (error) {
        errors.push({
          image: image.filename,
          error: error.message,
        });
      }
    }

    res.status(200).json({
      success: true,
      analyzed: results.length,
      errors: errors.length,
      results,
      errors,
    });
  } catch (error) {
    console.error('Error in analyze-and-import:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to analyze images',
      details: error.message,
    });
  }
}
