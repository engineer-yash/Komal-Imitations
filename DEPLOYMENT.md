# Vercel Deployment Guide - Komal Imitation Jewellery

## Quick Deploy (5 Minutes)

### Step 1: Prepare Your Repository

```bash
# Initialize git (if not already done)
cd /app/nextjs-app
git init
git add .
git commit -m "Initial commit: Komal Jewellery website"

# Create GitHub repository and push
git remote add origin https://github.com/YOUR_USERNAME/komal-jewellery.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"New Project"**
3. Import your `komal-jewellery` repository
4. Vercel will automatically detect Next.js

### Step 3: Configure Environment Variables

In Vercel dashboard, add these environment variables:

```
MONGODB_URI=mongodb+srv://gohelyash94_db_user:ux9l1TGPa29rc1k7@admin.s4ectaz.mongodb.net/komal_jewellery?retryWrites=true&w=majority

CLOUDINARY_CLOUD_NAME=dkinrfyq7
CLOUDINARY_API_KEY=199147376425354
CLOUDINARY_API_SECRET=yf-xnvBvO50SFSphu_JzEzNsXxQ

JWT_SECRET=komal_jewellery_secret_key_2026_secure

NEXT_PUBLIC_WHATSAPP=+918668586824
```

**Important**: Mark `NEXT_PUBLIC_WHATSAPP` as available to "Preview & Production" so it's accessible in the browser.

### Step 4: Deploy

Click **"Deploy"** and wait 2-3 minutes. You'll get a live URL like:
```
https://komal-jewellery.vercel.app
```

---

## Post-Deployment Setup

### 1. Test the Website

Visit your deployed URL and check:
- ✅ Homepage loads with images
- ✅ Products page works
- ✅ Contact form submits
- ✅ WhatsApp button works

### 2. Login to Admin Panel

Navigate to: `https://your-url.vercel.app/admin/login`

Credentials:
```
Email: admin@komal.com
Password: admin@komal.com
```

### 3. Add Initial Content

After logging in to admin panel:

#### a) Create Categories
Navigate to **Categories** and add:
- Necklaces (slug: `necklaces`)
- Earrings (slug: `earrings`)
- Bangles (slug: `bangles`)
- Rings (slug: `rings`)

Use these image URLs from design guidelines:
```
Necklaces: https://images.unsplash.com/photo-1743877427459-ed950b323498?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwxfHxnb2xkJTIwbmVja2xhY2UlMjBzZXQlMjBvbiUyMHdoaXRlJTIwYmFja2dyb3VuZCUyMGhpZ2glMjBxdWFsaXR5fGVufDB8fHx8MTc2OTY4NDUxNnww&ixlib=rb-4.1.0&q=85

Earrings: https://images.unsplash.com/photo-1760264554244-a72760f89ef3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxnb2xkJTIwZWFycmluZ3MlMjB3aGl0ZSUyMGJhY2tncm91bmQlMjBsdXh1cnl8ZW58MHx8fHwxNzY5Njg0NTMzfDA&ixlib=rb-4.1.0&q=85

Bangles: https://images.unsplash.com/photo-1758995116383-f51775896add?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHw0fHxnb2xkJTIwYmFuZ2xlcyUyMHdoaXRlJTIwYmFja2dyb3VuZCUyMGx1eHVyeXxlbnwwfHx8fDE3Njk2ODQ1MzV8MA&ixlib=rb-4.1.0&q=85
```

#### b) Add Sample Products
Navigate to **Products** and add sample products. Example:
```
Name: Gold Plated Necklace Set
Category: Necklaces
Price: 2500
Gender: Female
Image: Use Cloudinary image URLs
Featured: Check for homepage display
```

#### c) Upload Catalogs (Optional)
Navigate to **Catalogs** and add PDF catalogs with titles and descriptions.

---

## Custom Domain Setup

### Connect Your Own Domain

1. **In Vercel Dashboard**:
   - Go to Project Settings → Domains
   - Click "Add Domain"
   - Enter your domain (e.g., `komaljewellery.com`)

2. **Update DNS Records**:
   Add these records at your domain provider:

   **For apex domain (komaljewellery.com)**:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   ```

   **For www subdomain**:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **Wait for DNS Propagation** (5-10 minutes)

4. **Enable HTTPS**:
   Vercel automatically provisions SSL certificates

---

## MongoDB Atlas Setup (If Using Own Database)

### Create New Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster (M0)
3. Create database user with password
4. Whitelist IP: `0.0.0.0/0` (all IPs for serverless)
5. Get connection string:
   ```
   mongodb+srv://<username>:<password>@cluster.mongodb.net/komal_jewellery?retryWrites=true&w=majority
   ```
6. Update `MONGODB_URI` in Vercel environment variables
7. Redeploy

---

## Cloudinary Setup (If Using Own Account)

### Create Account

1. Sign up at [Cloudinary](https://cloudinary.com)
2. Get credentials from dashboard:
   - Cloud Name
   - API Key
   - API Secret
3. Update environment variables in Vercel
4. Upload jewellery images to Cloudinary
5. Use image URLs in admin panel

---

## Troubleshooting

### Issue: "Module not found" error

**Solution**:
```bash
cd /app/nextjs-app
rm -rf node_modules .next
yarn install
git add .
git commit -m "Fix dependencies"
git push
```

### Issue: MongoDB connection timeout

**Check**:
- MongoDB URI is correct
- Database user password has no special characters
- Network access allows `0.0.0.0/0`
- Cluster is active (not paused)

**Fix**: 
Update MongoDB URI in Vercel, then redeploy

### Issue: Images not loading

**Check**:
- Image URLs are accessible
- Cloudinary credentials are correct
- `next.config.js` includes image domains

**Fix**:
```javascript
// next.config.js
images: {
  domains: ['images.unsplash.com', 'res.cloudinary.com'],
}
```

### Issue: API routes return 404

**Check**:
- All files are in `/pages/api/` directory
- Vercel build completed successfully
- Check Vercel function logs

**Fix**: Check Vercel deployment logs and error messages

---

## Performance Optimization

### Enable Image Optimization

Vercel automatically optimizes images through Next.js Image component.

### Add Caching Headers

In `next.config.js`:
```javascript
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=3600, must-revalidate',
        },
      ],
    },
  ]
}
```

### Monitor Performance

- Use Vercel Analytics (free)
- Check Core Web Vitals
- Monitor API function execution times

---

## Security Checklist

- ✅ Change admin password after deployment
- ✅ Use strong JWT_SECRET (random 32+ characters)
- ✅ Enable MongoDB IP whitelist (if not serverless)
- ✅ Rotate API keys every 6 months
- ✅ Use HTTPS only (auto-enabled by Vercel)
- ✅ Never commit `.env.local` to git

---

## Maintenance

### Regular Updates

```bash
# Pull latest changes
git pull

# Update dependencies
yarn upgrade

# Test locally
yarn dev

# Deploy
git push
```

### Backup Database

Use MongoDB Atlas automated backups or:
```bash
# Manual backup
mongodump --uri="mongodb+srv://..." --out=backup/
```

### Monitor Uptime

- Use Vercel's built-in monitoring
- Set up uptime monitoring (UptimeRobot, etc.)
- Check MongoDB Atlas metrics

---

## Support

### Vercel Support
- Documentation: https://vercel.com/docs
- Community: https://github.com/vercel/vercel/discussions

### MongoDB Support
- Documentation: https://docs.mongodb.com
- Community: https://www.mongodb.com/community/forums

### Website Issues
Check logs:
- Vercel Dashboard → Project → Functions
- Browser Console (F12)
- MongoDB Atlas → Metrics

---

## Success Checklist

After deployment, verify:

- [ ] Website loads at Vercel URL
- [ ] Homepage displays correctly
- [ ] Products page filters work
- [ ] Contact form submits successfully
- [ ] WhatsApp button opens chat
- [ ] Google Maps embed loads
- [ ] Admin login works
- [ ] Admin can add/edit products
- [ ] Mobile responsive design works
- [ ] Images load quickly
- [ ] SEO meta tags present

---

**Congratulations! Your website is live!** 🎉

Share your URL: `https://komal-jewellery.vercel.app`

Next: Add to Google My Business and social media profiles.
