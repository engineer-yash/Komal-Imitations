# Vercel Deployment Checklist - Komal Jewellers

## Pre-Deployment

### Code Preparation
- [ ] All changes committed to Git
- [ ] `.env.local` is in `.gitignore` (not committed)
- [ ] `node_modules/` is in `.gitignore`
- [ ] `.next/` build folder is in `.gitignore`
- [ ] All dependencies listed in `package.json`
- [ ] Test build locally: `yarn build`
- [ ] Test production mode: `yarn start`

### Repository Setup
- [ ] GitHub repository created
- [ ] Code pushed to `main` branch
- [ ] Repository is accessible
- [ ] README.md updated

### Environment Variables Prepared

Have these ready before deployment:

```
MONGODB_URI=mongodb+srv://...
CLOUDINARY_CLOUD_NAME=dkinrfyq7
CLOUDINARY_API_KEY=199147376425354
CLOUDINARY_API_SECRET=yf-xnvBvO50SFSphu_JzEzNsXxQ
JWT_SECRET=komal_jewellery_secret_key_2026_secure
NEXT_PUBLIC_WHATSAPP=+918668586824
```

### Database Setup
- [ ] MongoDB Atlas cluster is running
- [ ] Network Access set to `0.0.0.0/0` (or Vercel IPs)
- [ ] Connection string tested
- [ ] Database user has read/write permissions

### Cloudinary Setup
- [ ] Cloudinary account active
- [ ] Folder exists: `Home/komal_imitation_jewellery`
- [ ] API credentials verified
- [ ] Upload tested locally

---

## Vercel Dashboard Deployment

### Step 1: Import Project
- [ ] Login to [vercel.com](https://vercel.com)
- [ ] Click "New Project"
- [ ] Select your GitHub repository
- [ ] Framework preset: **Next.js** (auto-detected)

### Step 2: Configure Build Settings

- [ ] **Root Directory**: `./` (leave as default)
- [ ] **Build Command**: `yarn build` (auto-detected)
- [ ] **Output Directory**: `.next` (auto-detected)  
- [ ] **Install Command**: `yarn install` (auto-detected)
- [ ] **Node Version**: 18.x or higher

### Step 3: Add Environment Variables

In "Environment Variables" section:

- [ ] Add `MONGODB_URI`
  - Environment: Production, Preview, Development (all checked)
  
- [ ] Add `CLOUDINARY_CLOUD_NAME`
  - Environment: Production, Preview, Development
  
- [ ] Add `CLOUDINARY_API_KEY`
  - Environment: Production, Preview, Development
  
- [ ] Add `CLOUDINARY_API_SECRET`
  - Environment: Production, Preview, Development
  
- [ ] Add `JWT_SECRET`
  - Environment: Production, Preview, Development
  
- [ ] Add `NEXT_PUBLIC_WHATSAPP`
  - Environment: Production, Preview, Development

### Step 4: Deploy
- [ ] Click "Deploy"
- [ ] Wait for build (2-5 minutes)
- [ ] Build successful ✅

---

## Post-Deployment Verification

### Basic Functionality
- [ ] Homepage loads: `https://your-app.vercel.app`
- [ ] Navigation works (all menu items)
- [ ] Products page displays
- [ ] About page loads
- [ ] Contact page works
- [ ] Logos display correctly (responsive)

### Admin Panel
- [ ] Admin login page accessible: `/admin/login`
- [ ] Can login with:
  ```
  Email: admin@komal.com
  Password: admin@komal.com
  ```
- [ ] Dashboard loads
- [ ] Products management works
- [ ] Categories management works
- [ ] Testimonials management works
- [ ] Homepage editor works

### Image Upload Features
- [ ] "Upload from Device" button works
- [ ] Can select image from computer
- [ ] Image uploads to Cloudinary successfully
- [ ] Image URL saved correctly
- [ ] "Browse" button works
- [ ] Cloudinary browser shows images
- [ ] Can select image from browser
- [ ] Selected image displays in preview

### Database Operations
- [ ] Can create new product
- [ ] Can edit existing product
- [ ] Can delete product
- [ ] Can create category
- [ ] Can create testimonial
- [ ] Contact form submits
- [ ] Data persists after page reload

### API Routes
- [ ] `GET /api/products` works
- [ ] `GET /api/categories` works
- [ ] `GET /api/testimonials` works
- [ ] `GET /api/homepage` works
- [ ] `POST /api/contact` works
- [ ] `GET /api/cloudinary/fetch-images` works
- [ ] Protected routes require authentication

### Visual Elements
- [ ] Colors match brand (gold #D4AF37)
- [ ] Full logo shows on desktop/default
- [ ] Small "K" logo shows on mobile/scroll
- [ ] Animations work smoothly
- [ ] Product carousel auto-slides
- [ ] Testimonials section displays
- [ ] Images load properly
- [ ] Responsive on mobile
- [ ] Responsive on tablet
- [ ] Responsive on desktop

### Performance
- [ ] Page load time < 3 seconds
- [ ] Images optimized (Next.js Image)
- [ ] No console errors
- [ ] No 404 errors
- [ ] Lighthouse score > 80

---

## Content Population

### Initial Setup
- [ ] Login to admin panel
- [ ] Change admin password

### Add Categories
- [ ] Create "Necklaces" category with image
- [ ] Create "Earrings" category with image
- [ ] Create "Bangles" category with image
- [ ] Create "Rings" category with image
- [ ] Create "Sets" category with image

### Add Products
- [ ] Add at least 10 products
- [ ] Use image upload feature
- [ ] Set prices correctly
- [ ] Assign categories
- [ ] Mark some as featured
- [ ] Add descriptions

### Add Testimonials
- [ ] Add at least 3 customer testimonials
- [ ] Include customer names
- [ ] Add ratings (5 stars)
- [ ] Mark as featured for homepage
- [ ] Optional: add customer photos

### Update Homepage
- [ ] Set hero title
- [ ] Set hero subtitle
- [ ] Upload hero background image
- [ ] Set about title
- [ ] Set about text
- [ ] Upload about section image

---

## Optional Enhancements

### Custom Domain
- [ ] Purchase domain (if not already owned)
- [ ] Add domain in Vercel: Settings → Domains
- [ ] Update DNS records:
  ```
  Type: A, Name: @, Value: 76.76.21.21
  Type: CNAME, Name: www, Value: cname.vercel-dns.com
  ```
- [ ] Wait for DNS propagation (up to 48 hours)
- [ ] Verify domain works
- [ ] SSL certificate auto-generated ✅

### Analytics & Monitoring
- [ ] Enable Vercel Analytics
- [ ] Set up error tracking
- [ ] Monitor MongoDB usage
- [ ] Check Cloudinary storage
- [ ] Set up uptime monitoring

### SEO Optimization
- [ ] Submit sitemap to Google Search Console
- [ ] Add Google Analytics (if desired)
- [ ] Verify meta tags on all pages
- [ ] Check Open Graph tags
- [ ] Test social media sharing

---

## Security Hardening

### Production Security
- [ ] Change admin credentials from defaults
- [ ] Generate new JWT_SECRET (strong random string)
- [ ] Enable MongoDB IP whitelist (specific IPs if possible)
- [ ] Rotate Cloudinary API keys
- [ ] Review CORS settings
- [ ] Enable rate limiting (if needed)
- [ ] Set up MongoDB backup schedule
- [ ] Document all credentials securely

---

## Troubleshooting

### If Build Fails

**Check these:**
- [ ] All dependencies in `package.json`
- [ ] Node version compatible (18.x+)
- [ ] No TypeScript errors (if using TS)
- [ ] Review build logs in Vercel

**Try locally:**
```bash
rm -rf node_modules .next
yarn install
yarn build
```

### If Site is Slow
- [ ] Check MongoDB query performance
- [ ] Optimize images (already using Next.js Image)
- [ ] Review Vercel function logs
- [ ] Check Analytics for bottlenecks
- [ ] Consider caching strategies

### If Images Don't Load
- [ ] Verify Cloudinary credentials
- [ ] Check `next.config.js` image domains
- [ ] Ensure images exist in Cloudinary
- [ ] Check browser console for errors
- [ ] Test image URLs directly

### If Database Connection Fails
- [ ] Verify MongoDB URI format
- [ ] Check Network Access (0.0.0.0/0)
- [ ] Ensure cluster is not paused
- [ ] Test connection string locally
- [ ] Review MongoDB Atlas logs

---

## Final Checks

### Before Going Live
- [ ] All features tested and working
- [ ] Content populated
- [ ] Admin password changed
- [ ] Security measures in place
- [ ] Performance acceptable
- [ ] Mobile experience tested
- [ ] Contact form tested
- [ ] WhatsApp link works
- [ ] Social media links correct
- [ ] No placeholder content

### Launch Day
- [ ] Announce on social media
- [ ] Share with customers
- [ ] Add website to Google My Business
- [ ] Update business cards/marketing materials
- [ ] Monitor traffic and errors
- [ ] Be ready to respond to customer inquiries

---

## Maintenance Schedule

### Weekly
- [ ] Check error logs
- [ ] Review new contact form submissions
- [ ] Update products/inventory
- [ ] Monitor site performance

### Monthly
- [ ] Backup database
- [ ] Review analytics
- [ ] Update dependencies: `yarn upgrade-interactive`
- [ ] Test all features
- [ ] Review and respond to customer feedback

### Quarterly
- [ ] Security audit
- [ ] Performance optimization
- [ ] Content refresh
- [ ] Review SEO rankings
- [ ] Update product images

---

## Success Criteria

✅ **Deployment is successful when:**

1. Website is live and accessible
2. All pages load correctly
3. Admin panel fully functional
4. Image upload working (device + Cloudinary)
5. Database operations successful
6. No critical errors in logs
7. Performance meets expectations
8. Mobile responsive
9. Content populated
10. Security measures in place

---

## Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **MongoDB Atlas**: https://docs.atlas.mongodb.com/
- **Cloudinary Docs**: https://cloudinary.com/documentation

---

🎉 **Congratulations!** Your Komal Jewellers website is now deployed and ready to serve customers.

**Live URL**: `https://your-app.vercel.app`

**Admin Panel**: `https://your-app.vercel.app/admin/login`
