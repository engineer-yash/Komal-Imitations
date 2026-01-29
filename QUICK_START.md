# Quick Start Guide - Deploy in 5 Minutes

## 🚀 Fast Track to Production

### Step 1: Push to GitHub (2 minutes)

```bash
# Navigate to project
cd /app/nextjs-app

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Premium jewellery website for Komal Imitation Jewellery"

# Create repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/komal-jewellery.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel (3 minutes)

1. **Go to**: https://vercel.com/new
2. **Import** your GitHub repository
3. **Add Environment Variables**:
   ```
   MONGODB_URI=mongodb+srv://gohelyash94_db_user:ux9l1TGPa29rc1k7@admin.s4ectaz.mongodb.net/komal_jewellery?retryWrites=true&w=majority
   CLOUDINARY_CLOUD_NAME=dkinrfyq7
   CLOUDINARY_API_KEY=199147376425354
   CLOUDINARY_API_SECRET=yf-xnvBvO50SFSphu_JzEzNsXxQ
   JWT_SECRET=komal_jewellery_secret_key_2026_secure
   NEXT_PUBLIC_WHATSAPP=+918668586824
   ```
4. **Click Deploy**

### Step 3: Access Your Live Site

Your site will be live at: `https://your-project-name.vercel.app`

---

## ⚡ First Login

Navigate to: `https://your-url.vercel.app/admin/login`

```
Email: admin@komal.com
Password: admin@komal.com
```

---

## 📝 Add Content Immediately

### 1. Create Categories (1 minute)

Go to Admin → Categories, add these:

**Necklaces**
```
Name: Necklaces
Slug: necklaces
Image: https://images.unsplash.com/photo-1743877427459-ed950b323498?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwxfHxnb2xkJTIwbmVja2xhY2UlMjBzZXQlMjBvbiUyMHdoaXRlJTIwYmFja2dyb3VuZCUyMGhpZ2glMjBxdWFsaXR5fGVufDB8fHx8MTc2OTY4NDUxNnww&ixlib=rb-4.1.0&q=85
```

**Earrings**
```
Name: Earrings
Slug: earrings
Image: https://images.unsplash.com/photo-1760264554244-a72760f89ef3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxnb2xkJTIwZWFycmluZ3MlMjB3aGl0ZSUyMGJhY2tncm91bmQlMjBsdXh1cnl8ZW58MHx8fHwxNzY5Njg0NTMzfDA&ixlib=rb-4.1.0&q=85
```

**Bangles**
```
Name: Bangles
Slug: bangles
Image: https://images.unsplash.com/photo-1758995116383-f51775896add?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHw0fHxnb2xkJTIwYmFuZ2xlcyUyMHdoaXRlJTIwYmFja2dyb3VuZCUyMGx1eHVyeXxlbnwwfHx8fDE3Njk2ODQ1MzV8MA&ixlib=rb-4.1.0&q=85
```

**Rings**
```
Name: Rings
Slug: rings
```

### 2. Add Sample Products (3 minutes)

Go to Admin → Products, add these examples:

**Product 1**
```
Name: Royal Gold Necklace Set
Category: Necklaces
Price: 3500
Gender: Female
Image: https://images.unsplash.com/photo-1693928876936-e6c25a7b79c4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwzfHxnb2xkJTIwbmVja2xhY2UlMjBzZXQlMjBvbiUyMHdoaXRlJTIwYmFja2dyb3VuZCUyMGhpZ2glMjBxdWFsaXR5fGVufDB8fHx8MTc2OTY4NDUxN3ww&ixlib=rb-4.1.0&q=85
Featured: ✓ (checked)
```

**Product 2**
```
Name: Designer Gold Earrings
Category: Earrings
Price: 1500
Gender: Female
Image: https://images.unsplash.com/photo-1760264554244-a72760f89ef3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxnb2xkJTIwZWFycmluZ3MlMjB3aGl0ZSUyMGJhY2tncm91bmQlMjBsdXh1cnl8ZW58MHx8fHwxNzY5Njg0NTMzfDA&ixlib=rb-4.1.0&q=85
Featured: ✓ (checked)
```

**Product 3**
```
Name: Traditional Bangles Set
Category: Bangles
Price: 2800
Gender: Female
Image: https://images.unsplash.com/photo-1758995116383-f51775896add?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHw0fHxnb2xkJTIwYmFuZ2xlcyUyMHdoaXRlJTIwYmFja2dyb3VuZCUyMGx1eHVyeXxlbnwwfHx8fDE3Njk2ODQ1MzV8MA&ixlib=rb-4.1.0&q=85
Featured: ✓ (checked)
```

---

## ✅ Verification Checklist

After deployment, check these:

- [ ] Website loads at Vercel URL
- [ ] Homepage displays hero section
- [ ] Products page shows sample products
- [ ] Filters work (category, gender, price)
- [ ] Contact form submits successfully
- [ ] WhatsApp button opens chat
- [ ] Google Maps shows location
- [ ] Admin login works
- [ ] Can add/edit products in admin
- [ ] Mobile view looks good

---

## 🔗 Important URLs

After deployment, bookmark these:

```
Public Site: https://your-url.vercel.app
Admin Login: https://your-url.vercel.app/admin/login
Vercel Dashboard: https://vercel.com/dashboard
```

---

## 📲 Share Your Website

Once live, share with:

1. **Google My Business**
   - Add website URL to your listing
   - Update business information

2. **WhatsApp Status**
   ```
   🎊 Our new website is live!
   Browse our collection online: https://your-url.vercel.app
   Shop 24/7 from home 💍✨
   ```

3. **Social Media**
   - Instagram Story/Post
   - Facebook Page
   - YouTube description

4. **Direct Message Template**
   ```
   Hello! 👋
   
   Thank you for your interest in Komal Jewellery!
   
   You can now browse our full collection online:
   🌐 https://your-url.vercel.app
   
   📞 Call/WhatsApp: +91 86685 86824
   📍 Visit: Raviwar Peth, Pune
   
   We look forward to serving you! 💎
   ```

---

## 🛠️ Need Help?

**Common Issues**:

1. **Build Failed**
   - Check environment variables are added correctly
   - Ensure all required variables are present

2. **Can't Login**
   - Check MongoDB connection
   - Verify JWT_SECRET is set

3. **Images Not Loading**
   - Verify Cloudinary credentials
   - Check image URLs are accessible

**Solutions**: See `DEPLOYMENT.md` for detailed troubleshooting

---

## 📈 Analytics Setup (Optional)

Add Google Analytics for tracking:

1. Create GA4 property
2. Add tracking code to `pages/_document.js`
3. Monitor traffic in GA dashboard

---

## 🎯 You're Done!

Your premium jewellery website is now live and ready to serve customers worldwide! 🎉

**What's Working**:
✅ Beautiful luxury design
✅ Product browsing with filters
✅ Contact form & WhatsApp
✅ Admin panel for management
✅ Mobile responsive
✅ Fast & secure

**Next**: Add more products and start marketing! 🚀

---

Need assistance? Check the comprehensive documentation in `README.md` and `DEPLOYMENT.md`.
