# Komal Jewellers - Premium E-Commerce Website

A luxurious, modern jewellery e-commerce website built with Next.js, featuring a comprehensive admin panel, MongoDB database, and Cloudinary image management. Fully deployable on Vercel.

## 🎯 Project Overview

This is a complete, production-ready website for **Komal Jewellers**, a premium jewellery shop based in Pune, Maharashtra. The website features:

- **Premium Design**: Luxurious gold accents (#D4AF37) with elegant animations
- **Responsive Logos**: Full logo on desktop, compact "K" logo on mobile/scroll
- **Image Management**: Direct upload from device + Cloudinary browser integration
- **Full E-Commerce**: Product browsing with advanced filters
- **Admin Panel**: Complete content management (products, categories, testimonials, homepage)
- **Enhanced UX**: Product highlights carousel, customer testimonials, smooth animations
- **Mobile-First**: Optimized for all devices
- **Performance**: Optimized images with Next.js Image component
- **SEO-Ready**: Proper meta tags and semantic HTML

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with serverless API routes
- **React 19** - Latest React version
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Axios** - HTTP client

### Backend
- **Next.js API Routes** - Serverless functions
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Cloud Services
- **Vercel** - Hosting platform (recommended)
- **MongoDB Atlas** - Database hosting
- **Cloudinary** - Image hosting and management

## 📁 Project Structure

```
/app/
├── pages/
│   ├── api/               # Serverless API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── products/      # Product CRUD
│   │   ├── categories/    # Category management
│   │   ├── catalogs/      # Catalog management
│   │   ├── testimonials/  # Testimonials CRUD
│   │   ├── contact/       # Contact form
│   │   ├── homepage/      # Homepage content
│   │   └── cloudinary/    # Image upload & fetch
│   ├── admin/             # Admin panel pages
│   │   ├── login.js
│   │   ├── dashboard.js
│   │   ├── products.js
│   │   ├── categories.js
│   │   ├── testimonials.js
│   │   ├── homepage.js
│   │   ├── cloudinary-import.js
│   │   └── [other management pages]
│   ├── index.js           # Homepage (enhanced)
│   ├── products.js        # Products listing
│   ├── about.js           # About page (enhanced)
│   ├── contact.js         # Contact page
│   ├── _app.js            # App wrapper
│   └── _document.js       # HTML document
├── components/            # Reusable components
│   ├── Navbar.js          # Enhanced with responsive logos
│   ├── Footer.js
│   ├── Layout.js
│   └── ImageUploadWidget.js  # Upload + Cloudinary browser
├── models/                # MongoDB models
│   ├── User.js
│   ├── Product.js
│   ├── Category.js
│   ├── Catalog.js
│   ├── HomePage.js
│   ├── Testimonial.js
│   └── ContactMessage.js
├── lib/                   # Utilities
│   ├── mongodb.js         # Database connection
│   └── auth.js            # Auth middleware
├── styles/
│   └── globals.css        # Global styles
└── public/                # Static assets
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Yarn package manager (DO NOT use npm)
- MongoDB Atlas account (free tier works)
- Cloudinary account (for image uploads)

### Step 1: Install Dependencies

```bash
cd /app
yarn install
```

### Step 2: Environment Variables

Create `.env.local` file in the root directory:

```env
MONGODB_URI=mongodb+srv://gohelyash94_db_user:ux9l1TGPa29rc1k7@admin.s4ectaz.mongodb.net/komal_jewellery?retryWrites=true&w=majority
CLOUDINARY_CLOUD_NAME=dkinrfyq7
CLOUDINARY_API_KEY=199147376425354
CLOUDINARY_API_SECRET=yf-xnvBvO50SFSphu_JzEzNsXxQ
JWT_SECRET=komal_jewellery_secret_key_2026_secure
NEXT_PUBLIC_WHATSAPP=+918668586824
```

⚠️ **IMPORTANT**: Never commit `.env.local` to GitHub. Change credentials for production.

### Step 3: Run Development Server

```bash
yarn dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **API**: http://localhost:3000/api

## 📦 Vercel Deployment

### Quick Deploy

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Add Environment Variables** in Vercel Dashboard:
   ```
   MONGODB_URI=<your-mongodb-connection-string>
   CLOUDINARY_CLOUD_NAME=<your-cloudinary-name>
   CLOUDINARY_API_KEY=<your-cloudinary-key>
   CLOUDINARY_API_SECRET=<your-cloudinary-secret>
   JWT_SECRET=<random-secure-string>
   NEXT_PUBLIC_WHATSAPP=+918668586824
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically
   - You'll get a live URL like `komal-jewellers.vercel.app`

## 🖼️ Image Upload Features

### Two Ways to Add Images:

1. **Upload from Device** (NEW)
   - Click "Upload from Device" button
   - Select image from your computer
   - Image automatically uploads to Cloudinary folder: `Home/komal_imitation_jewellery`
   - URL is saved to MongoDB

2. **Browse Cloudinary**
   - Click "Browse" button
   - View all existing images from Cloudinary
   - Select any image to use
   - Works everywhere: products, categories, hero sections, about page

### Cloudinary Folder Structure:
All images are stored in: `Home/komal_imitation_jewellery/`

## 🔐 Admin Panel Access

### First Login

1. Navigate to `/admin/login`
2. Use these credentials:
   ```
   Email: admin@komal.com
   Password: admin@komal.com
   ```
3. The system will automatically create the admin account on first login

### Admin Features

- **Dashboard**: Overview and quick access
- **Products**: Add, edit, delete products with image upload
- **Categories**: Manage product categories with images
- **Testimonials**: Manage customer reviews (NEW)
- **Catalogs**: Upload and manage PDF catalogs
- **Messages**: View contact form submissions
- **Homepage**: Edit hero section, about content with images
- **Cloudinary Import**: Fetch and import images from Cloudinary (FIXED)

### Fix Applied:
- Cloudinary import no longer redirects to login
- Token authentication properly handled
- Image upload widget available on all admin forms

## 🎨 Design System

### Brand Colors
- **Primary Gold**: #D4AF37
- **Secondary Gold**: #B5952F
- **Background**: #FFFFFF (White)
- **Secondary Background**: #F9F5F0 (Ivory)
- **Text**: #1A1A1A
- **Muted Text**: #666666

### Logos
- **Desktop/Default**: Full logo with "KOMAL JEWELLERS" text
  - URL: `https://res.cloudinary.com/dkinrfyq7/image/upload/v1769782665/Gemini_Generated_Image_5lblt65lblt65lbl-removebg_fxir4a.png`
- **Mobile/Scrolled**: Compact "K" logo
  - URL: `https://res.cloudinary.com/dkinrfyq7/image/upload/v1769777460/Logo_zozcty.jpg`

### Typography
- **Headings**: Playfair Display (Serif)
- **Body**: System fonts (San-serif)

### Animations
- Smooth fade + slide on scroll
- Hover effects on cards
- Product carousel with auto-slide
- Enhanced micro-interactions

## 📊 Database Schema

### Collections

1. **users** - Admin authentication
2. **products** - Product catalog (with featured flag)
3. **categories** - Product categories
4. **catalogs** - Downloadable catalogs
5. **testimonials** - Customer reviews (NEW)
6. **homepagecontents** - Homepage editable content
7. **contactmessages** - Contact form submissions

## 🔧 API Endpoints

### Public Endpoints
- `GET /api/products` - Get all products (with filters)
- `GET /api/categories` - Get all categories
- `GET /api/catalogs` - Get all catalogs
- `GET /api/testimonials` - Get testimonials
- `GET /api/homepage` - Get homepage content
- `POST /api/contact` - Submit contact form
- `GET /api/cloudinary/fetch-images` - Fetch Cloudinary images

### Protected Endpoints (Require JWT)
- `POST /api/products` - Create product
- `PUT /api/products` - Update product
- `DELETE /api/products` - Delete product
- `POST /api/categories` - Create category
- `POST /api/testimonials` - Create testimonial
- `POST /api/cloudinary/upload-signature` - Get upload signature
- `PUT /api/homepage` - Update homepage content

## 📱 Enhanced Features

### Homepage
- ✅ Animated hero section with decorative elements
- ✅ Product highlights carousel (auto-slide)
- ✅ Category cards with hover effects
- ✅ Featured products section
- ✅ Customer testimonials section (NEW)
- ✅ Enhanced trust badges

### About Page
- ✅ Enhanced hero section
- ✅ Our story with rich content
- ✅ Core values showcase
- ✅ Why choose us section
- ✅ Store location with call-to-action

### Admin Panel
- ✅ Image upload from device
- ✅ Cloudinary browser integration
- ✅ Testimonials management
- ✅ All sections have image upload capability

## 🐛 Issues Fixed

1. ✅ **Cloudinary Import Authentication**: Fixed redirect to login issue
2. ✅ **Image Upload Widget**: Updated folder path to `Home/komal_imitation_jewellery`
3. ✅ **Upload Signature**: Consistent folder across all uploads
4. ✅ **Logo Integration**: Responsive logos properly implemented

## 🔒 Security Notes

### For Production:

1. **Change Default Credentials**
   - Update admin email/password after first login

2. **Environment Variables**
   - Never commit `.env.local` to GitHub
   - Use Vercel environment variables
   - Rotate JWT_SECRET regularly

3. **Database Access**
   - Use MongoDB Atlas IP whitelist
   - Enable two-factor authentication
   - Regular backup schedule

4. **API Keys**
   - Rotate Cloudinary keys if exposed
   - Use Cloudinary signed uploads

## 📞 Business Information

**Komal Jewellers**
- **Location**: Shubhansha Darga, Bohri Ali, 330, Borali, Rameshwar Chouk, Raviwar Peth, Pune, Maharashtra 411002
- **Phone**: +91 86685 86824
- **Hours**: Open Daily, 9:00 AM - 9:00 PM
- **WhatsApp**: Available for inquiries

## 🎯 Recent Updates

### Version 2.0 (Latest)
- ✨ Enhanced homepage with product carousel
- ✨ Customer testimonials section
- ✨ Improved animations throughout
- ✨ Direct image upload from device
- ✨ Fixed Cloudinary import authentication
- ✨ Responsive logo implementation
- ✨ Enhanced About page with rich content
- ✨ Better mobile experience

## 📄 License

This project is proprietary and confidential. All rights reserved by Komal Jewellers.

---

Built with ❤️ for Komal Jewellers | Premium Jewellery in Pune
