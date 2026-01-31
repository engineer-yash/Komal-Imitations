const { v2: cloudinary } = require('cloudinary');
require('dotenv').config({ path: '.env.local' });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function listImagesInFolder() {
  try {
    console.log('Listing images in komal_imitation_jewellery folder...\n');
    
    // Try with prefix to get all images recursively
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'komal_imitation_jewellery/',
      max_results: 500,
      resource_type: 'image',
    });

    if (result.resources.length === 0) {
      console.log('No images found with prefix komal_imitation_jewellery/');
      console.log('Trying without trailing slash...\n');
      
      const result2 = await cloudinary.api.resources({
        type: 'upload',
        prefix: 'komal_imitation_jewellery',
        max_results: 500,
        resource_type: 'image',
      });
      
      console.log(`Found ${result2.resources.length} images`);
      
      if (result2.resources.length > 0) {
        console.log('\nFirst 10 images:');
        result2.resources.slice(0, 10).forEach((img, i) => {
          console.log(`${i + 1}. ${img.public_id}`);
          console.log(`   URL: ${img.secure_url}`);
          console.log(`   Format: ${img.format}, Size: ${(img.bytes / 1024).toFixed(2)} KB`);
          console.log('');
        });
      }
    } else {
      console.log(`✅ Found ${result.resources.length} images!`);
      console.log('\nFirst 10 images:');
      result.resources.slice(0, 10).forEach((img, i) => {
        console.log(`${i + 1}. ${img.public_id}`);
        console.log(`   URL: ${img.secure_url}`);
        console.log(`   Format: ${img.format}, Size: ${(img.bytes / 1024).toFixed(2)} KB`);
        console.log('');
      });
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
  }
}

listImagesInFolder();
