# How to Upload and Manage Images - Komal Jewellers

## Overview

The Komal Jewellers website now supports **TWO WAYS** to add images:
1. **Upload from Device** - Direct upload from your computer
2. **Browse Cloudinary** - Select from existing images

Both methods work seamlessly across all admin pages!

## Method 1: Upload from Device (NEW! ✨)

### Where It Works
- ✅ Products (adding/editing)
- ✅ Categories (adding/editing)
- ✅ Testimonials (customer photos)
- ✅ Homepage (hero image, about image)

### How to Use

1. **Navigate to any admin page** (e.g., Admin → Products → Add Product)

2. **Find the Image Upload Widget**
   - Look for the image field
   - You'll see "Upload from Device" button

3. **Click "Upload from Device"**
   - File picker opens
   - Select image from your computer
   - Supports: JPG, PNG, WEBP

4. **Wait for Upload**
   - Shows "📤 Uploading..." status
   - Image automatically uploads to Cloudinary
   - Folder: `Home/komal_imitation_jewellery`

5. **Done!**
   - Image URL saved automatically
   - Preview shows your uploaded image
   - Ready to save your product/category

### Upload Specs
- **Recommended Size**: 1000x1000px or larger
- **Max File Size**: 10MB (Cloudinary limit)
- **Formats**: JPG, PNG, WEBP
- **Auto-optimization**: Cloudinary handles compression

## Method 2: Browse Cloudinary

### Where It Works
Same places as Method 1 - everywhere images are needed!

### How to Use

1. **Click "Browse" button** (next to Upload from Device)

2. **Image Browser Opens**
   - Shows all images from: `Home/komal_imitation_jewellery`
   - Grid view of all available images
   - Hover to see image names

3. **Select an Image**
   - Click on any image
   - Image URL automatically filled
   - Preview updates

4. **Done!**
   - Selected image ready to use
   - Continue with your product/category form

### Features
- ✅ Visual grid of all images
- ✅ Hover effects for better visibility
- ✅ Shows image filenames
- ✅ Instant selection
- ✅ No download needed

## Method 3: Manual URL Entry

### When to Use
If you already have an image URL (from Cloudinary or elsewhere)

### How to Use
1. Find the text input field (below upload buttons)
2. Paste your image URL
3. Preview updates automatically

## Cloudinary Dashboard Upload (Bulk)

### For uploading many images at once:

1. **Go to Cloudinary Dashboard**
   - Visit: https://cloudinary.com
   - Login with your credentials

2. **Navigate to Media Library**
   - Click "Media Library" in left sidebar
   - Open folder: `Home/komal_imitation_jewellery`

3. **Upload Images**
   - Click "Upload" button (top right)
   - Drag & drop multiple images
   - Or select multiple files
   - Supports up to 500 images at once

4. **Wait for Upload**
   - Progress bar shows upload status
   - All images now available in admin panel

5. **Use in Admin Panel**
   - Go to admin panel
   - Click "Browse" button
   - See all your uploaded images

## Cloudinary Import Feature (FIXED! ✅)

### What was Fixed
- ❌ **Before**: Redirected to login page
- ✅ **Now**: Works perfectly with authentication

### How to Use

1. **Navigate to Admin → Cloudinary Import**

2. **Step 1: Fetch Images**
   - Click "Fetch Images" button
   - Loads all images from `Home/komal_imitation_jewellery`
   - Shows image grid

3. **Step 2: Select Images**
   - Click images to select (checkbox appears)
   - Can select multiple
   - "Select All" / "Deselect All" buttons available

4. **Step 3: Analyze & Import**
   - Option 1: "Analyze Selected Images" - Review before import
   - Option 2: "Analyze & Auto-Import" - Direct import
   - AI analyzes images and generates product details

5. **Step 4: Review & Finalize** (if using Option 1)
   - See AI-generated product details
   - Edit if needed
   - Click "Import" to add to store

## Image Organization Best Practices

### Folder Structure
All images go to: `Home/komal_imitation_jewellery/`

You can organize in subfolders:
```
Home/komal_imitation_jewellery/
├── necklaces/
├── earrings/
├── bangles/
├── rings/
├── sets/
└── testimonials/
```

### File Naming Convention
Use descriptive names:
```
✅ Good:
- gold-necklace-bridal-heavy-1.jpg
- silver-earrings-chandelier-traditional.jpg
- kundan-bangles-red-stone-pair.jpg

❌ Avoid:
- IMG_1234.jpg
- photo.jpg
- untitled.png
```

### Image Requirements

**For Best Results:**
- **Resolution**: 1000x1000px or higher
- **Aspect Ratio**: Square (1:1) preferred
- **Background**: Clean, well-lit
- **Quality**: High-res, clear focus
- **Single Product**: One item per image
- **Multiple Angles**: Upload separately

## Troubleshooting

### Upload from Device Issues

**Issue: "Failed to upload image"**
- Check your internet connection
- Verify file size < 10MB
- Ensure file is image format (JPG/PNG/WEBP)
- Try refreshing the page

**Issue: Upload button not responding**
- Ensure you're logged in to admin
- Clear browser cache
- Try different browser

### Browse Cloudinary Issues

**Issue: "No images found"**
- Upload images to Cloudinary first
- Verify folder: `Home/komal_imitation_jewellery`
- Check Cloudinary credentials in `.env.local`

**Issue: "Failed to fetch images"**
- Check your authentication (logged in?)
- Verify Cloudinary API credentials
- Check browser console for errors

**Issue: Images not showing in browser**
- Ensure images uploaded to correct folder
- Wait a few seconds and retry
- Refresh the page

### Cloudinary Import Issues

**Issue: Redirects to login (SHOULD BE FIXED)**
- Clear browser cache
- Login again
- Try incognito/private window
- Check JWT token is valid

**Issue: AI analysis fails**
- Image quality too low
- Image format not supported
- Try individual images instead of bulk
- Use manual product creation instead

## Tips for Success

### 1. Image Quality
- Use good lighting
- Plain backgrounds work best
- Focus on the jewellery
- Avoid cluttered backgrounds

### 2. File Management
- Name files descriptively
- Keep backups of originals
- Organize by category
- Delete unused images periodically

### 3. Performance
- Don't upload unnecessarily large images
- Cloudinary auto-optimizes
- Use appropriate format (WEBP for web)

### 4. Consistency
- Similar aspect ratios for all products
- Consistent styling
- Same background type
- Uniform lighting

## Quick Reference

| Task | Method | Location |
|------|--------|----------|
| Add product image | Upload/Browse | Admin → Products |
| Add category image | Upload/Browse | Admin → Categories |
| Add testimonial photo | Upload/Browse | Admin → Testimonials |
| Update hero image | Upload/Browse | Admin → Homepage |
| Bulk upload | Cloudinary Dashboard | cloudinary.com |
| AI import | Cloudinary Import | Admin → Cloudinary Import |

## Support

### Need Help?

**Common Solutions:**
1. Refresh the page
2. Clear browser cache
3. Re-login to admin
4. Check Cloudinary dashboard
5. Verify file format and size

**Still Having Issues?**
- Check browser console for errors
- Review Cloudinary status
- Verify credentials in `.env.local`
- Test with different image file

---

## Summary

✅ **Two ways to add images:**
1. Upload from your device (NEW!)
2. Browse existing Cloudinary images

✅ **Works everywhere:** Products, Categories, Testimonials, Homepage

✅ **Easy to use:** Click, select, done!

✅ **Cloudinary Import fixed:** No more login redirect

✅ **Automatic optimization:** Cloudinary handles it

---

**Happy uploading! 🖼️✨**

For bulk uploads or advanced management, use the Cloudinary Dashboard.

For quick additions, use the Upload from Device feature.

For using existing images, use the Browse feature.
