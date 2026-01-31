# 🚀 Vercel Deployment Guide

This guide will help you deploy the Komal Jewellers website to Vercel from GitHub.

---

## Prerequisites

✅ GitHub account  
✅ Vercel account (free tier is sufficient)  
✅ MongoDB Atlas account (free tier)  
✅ Cloudinary account (free tier)  
✅ Code pushed to GitHub repository

---

## Step 1: Push Code to GitHub

1. **Initialize Git (if not already done):**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Komal Jewellers website"
   ```

2. **Create GitHub Repository:**
   - Go to https://github.com/new
   - Create a new repository (e.g., `komal-jewellers`)
   - Don't initialize with README (we already have one)

3. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/komal-jewellers.git
   git branch -M main
   git push -u origin main
   ```

---

## Step 2: Setup MongoDB Atlas

1. **Create Cluster:**
   - Go to https://www.mongodb.com/cloud/atlas
   - Create free cluster (M0 tier)
   - Choose region closest to your users

2. **Get Connection String:**
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/komal_jewellers?retryWrites=true&w=majority`

3. **Whitelist IPs:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0) for Vercel

---

## Step 3: Setup Cloudinary

1. **Create Account:**
   - Go to https://cloudinary.com/
   - Sign up for free account

2. **Get Credentials:**
   - Go to Dashboard
   - Copy:
     - Cloud Name
     - API Key
     - API Secret

---

## Step 4: Deploy to Vercel

### Method 1: Import from GitHub (Recommended)

1. **Login to Vercel:**
   - Go to https://vercel.com/
   - Sign up/Login with GitHub

2. **Import Project:**
   - Click "Add New..." → "Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Project:**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (default)
   - **Build Command:** `yarn build` (default)
   - **Output Directory:** `.next` (default)

4. **Add Environment Variables:**
   Click "Environment Variables" and add:

   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/komal_jewellers
   NEXT_PUBLIC_WHATSAPP=+919876543210
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   EMERGENT_LLM_KEY=sk-emergent-xxxxxxxxxxxxx
   ```

   **Important:** Set all variables for **Production**, **Preview**, and **Development** environments.

5. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your site will be live at `https://your-project.vercel.app`

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts to set up project
# Add environment variables when prompted

# Deploy to production
vercel --prod
```

---

## Step 5: Post-Deployment Setup

### 1. Create Admin User

Since this is first deployment, you need to create admin account:

**Option A: Via MongoDB Compass**
1. Connect to your MongoDB Atlas cluster
2. Navigate to `komal_jewellers` database → `users` collection
3. Insert document:
   ```json
   {
     "email": "admin@komaljewellers.com",
     "password": "$2a$10$HASHED_PASSWORD_HERE",
     "role": "admin",
     "createdAt": {"$date": "2025-01-31T12:00:00.000Z"}
   }
   ```
   Note: Generate hashed password using bcryptjs online tool

**Option B: Via API (Recommended)**
Create a temporary signup endpoint or use MongoDB directly.

### 2. Test Admin Panel

1. Go to `https://your-site.vercel.app/admin/login`
2. Login with admin credentials
3. Add initial content:
   - Categories
   - Products
   - Homepage content
   - Collections (YouTube/Instagram)
   - Testimonials

### 3. Configure Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain (e.g., `komaljewellers.com`)
3. Follow DNS configuration instructions
4. Wait for SSL certificate to provision

---

## Step 6: Verify Deployment

### Checklist

✅ Home page loads correctly  
✅ Products page shows products  
✅ Collections page displays videos  
✅ Contact form works  
✅ Admin login works  
✅ Admin can add/edit products  
✅ Admin can manage collections with tabs  
✅ Images upload to Cloudinary  
✅ Category filtering works  
✅ Mobile responsive  
✅ WhatsApp button works  

---

## Environment Variables Reference

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` | ✅ Yes |
| `NEXT_PUBLIC_WHATSAPP` | WhatsApp number with country code | `+919876543210` | ✅ Yes |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | `your-cloud` | ✅ Yes |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `123456789` | ✅ Yes |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | `abc123xyz` | ✅ Yes |
| `EMERGENT_LLM_KEY` | Universal LLM key (optional) | `sk-emergent-xxx` | ❌ Optional |

---

## Troubleshooting

### Build Fails

**Error:** `Module not found`
- **Solution:** Ensure all dependencies are in `package.json` and committed

**Error:** `Environment variable not set`
- **Solution:** Check all required env vars are set in Vercel dashboard

### Runtime Errors

**Error:** `Cannot connect to MongoDB`
- **Solution:** Check MongoDB connection string and IP whitelist

**Error:** `Cloudinary upload fails`
- **Solution:** Verify Cloudinary credentials are correct

**Error:** `Images not loading`
- **Solution:** Check Cloudinary URLs and CORS settings

### Admin Panel Issues

**Cannot login:**
- Verify admin user exists in database
- Check JWT secret is set (auto-generated if not set)
- Clear browser cache and cookies

**Collections thumbnails not showing:**
- Verify YouTube URL format is correct
- Check video is public (not private/unlisted)

---

## Continuous Deployment

Once set up, Vercel automatically deploys:
- **Production:** Every push to `main` branch
- **Preview:** Every pull request

### To Update Site:

```bash
# Make changes
git add .
git commit -m "Update: description of changes"
git push origin main
```

Vercel will automatically rebuild and redeploy within 2-3 minutes.

---

## Performance Optimization

### Recommended Vercel Settings

1. **Enable Edge Functions** (if available on your plan)
2. **Configure Image Optimization:**
   - Already enabled via `next/image`
   - Cloudinary provides optimized images

3. **Enable Analytics** (optional):
   - Go to Vercel Dashboard → Your Project → Analytics
   - Enable Web Analytics

---

## Monitoring

### Vercel Dashboard

Monitor:
- Deployment status
- Build logs
- Runtime logs
- Performance metrics
- Error tracking

### MongoDB Atlas

Monitor:
- Database connections
- Query performance
- Storage usage

### Cloudinary Dashboard

Monitor:
- Image uploads
- Bandwidth usage
- Storage usage

---

## Support

### Common Issues

1. **Slow Page Load:** Optimize images, enable caching
2. **MongoDB Timeout:** Check connection pooling settings
3. **API Rate Limits:** Implement caching or upgrade plan

### Resources

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- MongoDB Docs: https://docs.mongodb.com/
- Cloudinary Docs: https://cloudinary.com/documentation

---

## 🎉 Congratulations!

Your Komal Jewellers website is now live on Vercel!

**Next Steps:**
1. Add initial products and content
2. Test all features thoroughly
3. Share with stakeholders
4. Set up custom domain
5. Monitor performance and user feedback

---

## Quick Reference Commands

```bash
# Local development
yarn dev

# Build for production
yarn build

# Start production server locally
yarn start

# Deploy to Vercel
vercel --prod

# View deployment logs
vercel logs

# View environment variables
vercel env ls
```

---

**Last Updated:** January 31, 2025  
**Version:** 1.0.0  
**Status:** ✅ Production Ready
