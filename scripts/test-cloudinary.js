const { v2: cloudinary } = require('cloudinary');
require('dotenv').config({ path: '.env.local' });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function testCloudinary() {
  try {
    console.log('Testing Cloudinary connection...\n');
    
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'komal_imitation_jewellery',
      max_results: 5,
      resource_type: 'image',
    });

    console.log('✅ Connection successful!');
    console.log(`Found ${result.resources.length} images (showing first 5)`);
    console.log('\nSample images:');
    
    result.resources.forEach((img, i) => {
      console.log(`${i + 1}. ${img.public_id}`);
      console.log(`   URL: ${img.secure_url}`);
      console.log(`   Size: ${(img.bytes / 1024).toFixed(2)} KB`);
      console.log('');
    });
  } catch (error) {
    console.error('❌ Error connecting to Cloudinary:');
    console.error(error.message);
  }
}

testCloudinary();
