const { v2: cloudinary } = require('cloudinary');
require('dotenv').config({ path: '.env.local' });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function listAllFolders() {
  try {
    console.log('Listing all root folders in Cloudinary...\n');
    
    const result = await cloudinary.api.root_folders();
    
    if (result.folders.length === 0) {
      console.log('No folders found. Checking for images in root...');
      
      const images = await cloudinary.api.resources({
        type: 'upload',
        max_results: 10,
        resource_type: 'image',
      });
      
      console.log(`\nFound ${images.resources.length} images in root`);
      images.resources.forEach((img, i) => {
        console.log(`${i + 1}. ${img.public_id}`);
      });
    } else {
      console.log('Folders found:');
      result.folders.forEach((folder, i) => {
        console.log(`${i + 1}. ${folder.name}`);
      });
      
      // Check for komal folder
      const komalFolder = result.folders.find(f => 
        f.name.toLowerCase().includes('komal') || 
        f.name.toLowerCase().includes('imitation') ||
        f.name.toLowerCase().includes('jewellery')
      );
      
      if (komalFolder) {
        console.log(`\n✅ Found matching folder: ${komalFolder.name}`);
      } else {
        console.log('\n⚠️  No folder matching "komal_imitation_jewellery" found');
        console.log('Please check the folder name in Cloudinary');
      }
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

listAllFolders();
