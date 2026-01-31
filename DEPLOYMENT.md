# Deployment Guide - Komal Jewellers Website

## Overview

This guide covers deploying the Komal Jewellers e-commerce website to Vercel. The application is a Next.js 14 application with MongoDB Atlas backend and Cloudinary image management.

## Pre-Deployment Checklist

### 1. Code Repository
- [ ] All code committed to Git
- [ ] `.env.local` NOT committed (in `.gitignore`)
- [ ] `node_modules` NOT committed
- [ ] `.next` build folder NOT committed
- [ ] All dependencies in `package.json`

### 2. Environment Variables Required

You'll need these for Vercel:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/komal_jewellery?retryWrites=true&w=majority
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_secure_random_string_here
NEXT_PUBLIC_WHATSAPP=+918668586824
```

### 3. Database Setup

**MongoDB Atlas Configuration:**
1. Ensure MongoDB Atlas cluster is running
2. Whitelist Vercel IPs:
   - Go to MongoDB Atlas → Network Access
   - Add IP: `0.0.0.0/0` (allows all IPs - Vercel uses dynamic IPs)
   - Or use specific Vercel IP ranges
3. Verify connection string is correct
4. Test connection locally first

### 4. Cloudinary Setup

**Required Configuration:**
1. Verify Cloudinary account is active
2. Folder structure: `Home/komal_imitation_jewellery/`
3. Ensure API credentials are correct
4. Test upload functionality locally

## Vercel Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

#### Step 1: Push to GitHub

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Deploy Komal Jewellers website"

# Add remote repository
git remote add origin https://github.com/your-username/komal-jewellers.git

# Push to GitHub
git push -u origin main
```

#### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Vercel auto-detects Next.js configuration

#### Step 3: Configure Project

**Framework Preset**: Next.js (auto-detected)

**Root Directory**: `./` (default)

**Build Command**: `yarn build` or `next build` (auto-detected)

**Output Directory**: `.next` (auto-detected)

**Install Command**: `yarn install` (auto-detected)

#### Step 4: Add Environment Variables

In Vercel Project Settings → Environment Variables, add:

```
MONGODB_URI = mongodb+srv://gohelyash94_db_user:ux9l1TGPa29rc1k7@admin.s4ectaz.mongodb.net/komal_jewellery?retryWrites=true&w=majority

CLOUDINARY_CLOUD_NAME = dkinrfyq7
CLOUDINARY_API_KEY = 199147376425354
CLOUDINARY_API_SECRET = yf-xnvBvO50SFSphu_JzEzNsXxQ

JWT_SECRET = komal_jewellery_secret_key_2026_secure

NEXT_PUBLIC_WHATSAPP = +918668586824
```

⚠️ **Important**: Set these for all environments (Production, Preview, Development)

#### Step 5: Deploy

1. Click "Deploy"
2. Wait for build to complete (2-5 minutes)
3. Vercel will provide a live URL

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? komal-jewellers
# - Directory? ./
# - Override settings? No

# Deploy to production
vercel --prod
```

## Post-Deployment

### 1. Verify Deployment

**Test these features:**
- [ ] Homepage loads correctly
- [ ] Product pages work
- [ ] Admin login functions
- [ ] Image uploads work
- [ ] Cloudinary browser works
- [ ] MongoDB connection active
- [ ] API routes respond
- [ ] Contact form submits

### 2. Admin Setup

1. Navigate to `https://your-domain.vercel.app/admin/login`
2. Login with:
   ```
   Email: admin@komal.com
   Password: admin@komal.com
   ```
3. System creates admin account on first login
4. Change password immediately

### 3. Content Population

1. **Add Categories**
   - Navigate to Admin → Categories
   - Add: Necklaces, Earrings, Bangles, Rings, Sets
   - Upload images for each

2. **Add Products**
   - Navigate to Admin → Products
   - Use image upload or Cloudinary browser
   - Fill in details and prices

3. **Add Testimonials**
   - Navigate to Admin → Testimonials
   - Add customer reviews
   - Mark some as featured

4. **Update Homepage**
   - Navigate to Admin → Homepage
   - Update hero title, subtitle, image
   - Update about section

### 4. Custom Domain (Optional)

1. Go to Vercel Project → Settings → Domains
2. Add your custom domain (e.g., `komaljewellers.com`)
3. Update DNS records as instructed by Vercel:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
4. Wait for DNS propagation (up to 48 hours)

## Troubleshooting

### Build Fails

**Error: Module not found**
```bash
# Locally, clear and reinstall
rm -rf node_modules .next
yarn install
yarn build
```

**Error: Environment variables not found**
- Check Vercel dashboard → Settings → Environment Variables
- Ensure all required variables are set
- Redeploy after adding variables

### Runtime Errors

**MongoDB Connection Failed**
- Verify MongoDB Atlas is accessible from `0.0.0.0/0`
- Check connection string format
- Ensure cluster is not paused
- Check Vercel logs for specific errors

**Images Not Loading**
- Verify Cloudinary credentials
- Check `next.config.js` has correct image domains:
  ```js
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com'],
  }
  ```
- Ensure images exist in Cloudinary

**API Routes 404**
- Verify file structure in `/pages/api/`
- Check function exports
- Review Vercel function logs

### Performance Issues

**Slow Page Load**
- Enable Vercel Analytics
- Optimize images (already using Next.js Image)
- Check MongoDB query performance
- Consider adding Redis caching

**Function Timeout**
- Vercel serverless functions timeout at 10s (Hobby plan)
- Optimize database queries
- Add indexes to MongoDB collections
- Consider upgrading Vercel plan

## Monitoring

### Vercel Analytics

1. Enable in Project Settings → Analytics
2. Monitor:
   - Page views
   - Performance metrics
   - Real User Monitoring (RUM)

### Error Tracking

1. Check Vercel logs:
   ```
   vercel logs [deployment-url]
   ```
2. View in dashboard: Project → Deployments → [deployment] → Logs

### Database Monitoring

1. MongoDB Atlas Dashboard
2. Check:
   - Active connections
   - Query performance
   - Storage usage
   - Network traffic

## Rollback

**If deployment has issues:**

1. Go to Vercel Dashboard
2. Project → Deployments
3. Find previous working deployment
4. Click "..." → "Promote to Production"

**Via CLI:**
```bash
vercel rollback
```

## Security Best Practices

### Production Checklist

- [ ] Change default admin credentials
- [ ] Update JWT_SECRET to strong random value
- [ ] Enable MongoDB IP whitelist (not 0.0.0.0/0)
- [ ] Rotate Cloudinary API keys
- [ ] Enable HTTPS (automatic on Vercel)
- [ ] Set up CSP headers
- [ ] Enable MongoDB Atlas backup
- [ ] Set up monitoring alerts

## Maintenance

### Regular Tasks

**Weekly:**
- Check error logs
- Review performance metrics
- Backup MongoDB data

**Monthly:**
- Update dependencies
- Review and rotate API keys
- Check disk usage (Cloudinary)
- Review analytics

**Quarterly:**
- Security audit
- Performance optimization
- Update content
- Review user feedback

## Scaling Considerations

### When to Scale

**Signs you need to upgrade:**
- Function timeouts increasing
- Bandwidth limits reached
- MongoDB connection limits
- Slow page load times

### Scaling Options

1. **Vercel Plan Upgrade**
   - More serverless function execution time
   - Higher bandwidth
   - Better analytics

2. **MongoDB Atlas Upgrade**
   - More storage
   - Better performance
   - Advanced features

3. **CDN Optimization**
   - Already using Vercel Edge Network
   - Cloudinary CDN for images

4. **Database Optimization**
   - Add indexes
   - Optimize queries
   - Implement caching

## Support

### Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **MongoDB Atlas**: https://docs.atlas.mongodb.com/
- **Cloudinary**: https://cloudinary.com/documentation

### Getting Help

1. Check Vercel Status: https://www.vercel-status.com/
2. MongoDB Atlas Support
3. Review error logs
4. Check GitHub Issues

---

✅ **Deployment Complete!** Your Komal Jewellers website is now live.
