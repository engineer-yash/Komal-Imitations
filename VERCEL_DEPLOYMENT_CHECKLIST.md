# 🚀 Vercel Deployment Checklist

## ✅ Pre-Deployment Verification

### 1. Build Test (Local)
- [x] Run `yarn build` - **SUCCESS** ✓
- [x] No compilation errors
- [x] All pages generated successfully (15/15)
- [x] Tailwind CSS v3 working correctly

### 2. Environment Variables Prepared
Required for Vercel:
```
MONGODB_URI=mongodb+srv://...
NEXT_PUBLIC_WHATSAPP=+91XXXXXXXXXX
CLOUDINARY_CLOUD_NAME=dkinrfyq7
CLOUDINARY_API_KEY=199147376425354
CLOUDINARY_API_SECRET=yf-xnvBvO50SFSphu_JzEzNsXxQ
EMERGENT_LLM_KEY=sk-emergent-260E0Ad03A61846B5A
```

## 📋 Deployment Steps

### Step 1: Prepare Repository
```bash
# Make sure all changes are committed
git add .
git commit -m "Fix deployment errors and add Cloudinary integration"
git push origin main
```

### Step 2: Deploy to Vercel

#### Option A: Vercel Dashboard
1. Go to https://vercel.com
2. Click "Import Project"
3. Select your Git repository
4. Configure project:
   - Framework: Next.js
   - Build Command: `yarn build`
   - Output Directory: `.next`
5. Add environment variables (from section above)
6. Click "Deploy"

#### Option B: Vercel CLI
```bash
# Install Vercel CLI if not installed
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts and set environment variables
```

### Step 3: Configure Environment Variables in Vercel

1. Go to Project Settings → Environment Variables
2. Add each variable:
   - Key: `MONGODB_URI`
   - Value: `your-mongodb-connection-string`
   - Environment: Production, Preview, Development
3. Repeat for all variables listed above

### Step 4: Verify Deployment

After deployment completes:
- [ ] Visit your deployment URL
- [ ] Check homepage loads correctly
- [ ] Test navigation (About, Products, Contact)
- [ ] Login to admin panel
- [ ] Try Cloudinary import feature

## 🔍 Post-Deployment Tasks

### 1. Upload Images to Cloudinary
- Go to Cloudinary dashboard
- Upload images to `komal_imitation_jewellery` folder
- Verify upload with: `node scripts/list-images-detailed.js`

### 2. Set Up Categories
- Login to admin: `https://your-domain.vercel.app/admin/login`
- Create categories:
  - Necklaces
  - Earrings
  - Bangles
  - Rings
  - Bracelets
  - Anklets
  - Maang Tikka
  - Sets

### 3. Import Products
- Go to Admin → Cloudinary Import
- Fetch images
- Select and analyze images
- Review AI-generated data
- Import products

### 4. Customize Homepage
- Go to Admin → Homepage
- Update hero image
- Update title and subtitle
- Update about section

### 5. Final Checks
- [ ] All products display correctly
- [ ] Images load from Cloudinary
- [ ] WhatsApp links work
- [ ] Contact form submits
- [ ] Mobile responsive
- [ ] SEO meta tags present

## 🐛 Troubleshooting

### Build Fails on Vercel

**Error: "Module not found: Can't resolve..."**
- Check all imports are correct
- Verify all dependencies in package.json
- Run `yarn install` locally

**Error: "API route failed"**
- Verify MONGODB_URI is set and accessible
- Check MongoDB IP whitelist (0.0.0.0/0 for Vercel)
- Verify Cloudinary credentials

**Error: "Build exceeded time limit"**
- Reduce image sizes if any
- Check for infinite loops in build
- Optimize dependencies

### Images Not Loading

**Cloudinary images 404:**
- Verify images exist in correct folder
- Check image URLs in database
- Verify CLOUDINARY_CLOUD_NAME is correct

**AI Analysis Fails:**
- Check EMERGENT_LLM_KEY is set
- Verify internet connectivity
- Check API rate limits

### Database Connection Issues

**MongoDB timeout:**
- Verify connection string format
- Check IP whitelist in MongoDB Atlas
- Add `0.0.0.0/0` to allow Vercel IPs

## 📊 Monitoring

### After Deployment:
1. **Check Vercel Dashboard:**
   - Build logs
   - Function logs
   - Analytics

2. **Monitor Performance:**
   - Page load times
   - API response times
   - Error rates

3. **Track Credits:**
   - Emergent LLM key usage
   - Cloudinary bandwidth
   - MongoDB Atlas storage

## 🎉 Success Indicators

Deployment is successful when:
- ✅ Build completes without errors
- ✅ All pages are accessible
- ✅ Images load from Cloudinary
- ✅ Admin panel works
- ✅ Products can be imported
- ✅ No console errors
- ✅ Mobile responsive
- ✅ Forms submit successfully

## 📞 Need Help?

Common resources:
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Cloudinary Docs: https://cloudinary.com/documentation
- MongoDB Atlas: https://www.mongodb.com/docs/atlas

---

**Ready to Deploy?** 🚀
Follow the steps above and your site will be live in minutes!
