# How to Upload Images to Cloudinary

## Current Status
✅ Cloudinary connection working
✅ Folder `komal_imitation_jewellery` exists
⚠️  **No images currently in the folder** - You need to upload images first

## Option 1: Upload via Cloudinary Dashboard (Recommended for Bulk Upload)

### Step-by-Step:
1. Go to https://cloudinary.com and login
2. Click on "Media Library" in the left sidebar
3. Navigate to or create the `komal_imitation_jewellery` folder
4. Click "Upload" button (top right)
5. Select multiple images (supports drag & drop)
6. Wait for upload to complete

### Tips:
- Upload high-quality images (recommended: 1000x1000px or larger)
- Use descriptive filenames (e.g., `gold-necklace-set-1.jpg`)
- Supported formats: JPG, PNG, WEBP
- You can upload up to 500 images at once

## Option 2: Upload via Cloudinary API (Programmatic)

Create a script to upload images from a local folder:

```javascript
// scripts/upload-to-cloudinary.js
const { v2: cloudinary } = require('cloudinary');
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadImages(folderPath) {
  const files = fs.readdirSync(folderPath)
    .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file));

  console.log(`Found ${files.length} images to upload\n`);

  for (const file of files) {
    try {
      const result = await cloudinary.uploader.upload(
        path.join(folderPath, file),
        {
          folder: 'komal_imitation_jewellery',
          public_id: path.parse(file).name,
          overwrite: false,
        }
      );
      console.log(`✅ Uploaded: ${file}`);
    } catch (error) {
      console.error(`❌ Failed to upload ${file}:`, error.message);
    }
  }
  
  console.log('\n✅ Upload complete!');
}

// Usage: node scripts/upload-to-cloudinary.js /path/to/images
uploadImages(process.argv[2] || './images');
```

## Option 3: Upload via Cloudinary Upload Widget (For Your Website)

Add an admin upload interface (optional enhancement):
- Integrate Cloudinary Upload Widget in your admin panel
- Allow direct uploads from admin dashboard
- Images automatically go to the correct folder

## After Uploading Images:

1. **Verify Upload**
   ```bash
   node scripts/list-images-detailed.js
   ```
   You should see your images listed

2. **Use the Import Feature**
   - Go to: https://your-domain.com/admin/cloudinary-import
   - Click "Fetch Images" - your images will appear
   - Select images to analyze
   - AI will generate product details
   - Review and import to your store

## Image Best Practices:

### For Best AI Analysis Results:
- **Clear, well-lit photos** with good contrast
- **Single product per image** (not group photos)
- **Plain or simple backgrounds** - helps AI focus on the jewellery
- **Multiple angles** if available (can import each as separate product)
- **High resolution** - at least 800x800px

### Recommended Image Naming:
```
gold-necklace-bridal-set-1.jpg
silver-earrings-traditional-2.jpg
kundan-bangles-red-stone-3.jpg
```
Good naming helps you organize and identify images later.

## Folder Structure in Cloudinary:

```
komal_imitation_jewellery/
├── necklaces/
│   ├── gold-necklace-1.jpg
│   ├── gold-necklace-2.jpg
│   └── ...
├── earrings/
│   ├── silver-earrings-1.jpg
│   └── ...
└── bangles/
    └── ...
```

You can organize images in subfolders. The API will fetch all images recursively.

## Need Help?

If you're having trouble uploading:
1. Check your Cloudinary credentials are correct
2. Verify you're uploading to the right folder
3. Ensure images are in supported formats (JPG, PNG, WEBP)
4. Check your Cloudinary storage quota (free plan has limits)

---

**Next Steps After Upload:**
1. Verify images are visible in Cloudinary Media Library
2. Run the import tool from admin panel
3. Let AI analyze and generate product data
4. Review and publish products to your store!
