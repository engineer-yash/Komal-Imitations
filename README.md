# Komal Imitation Jewellery - Premium E-Commerce Website

A luxurious, modern jewellery e-commerce website built with Next.js, featuring a serverless backend and MongoDB Atlas database. Fully deployable on Vercel.

## 🎯 Project Overview

This is a complete, production-ready website for **Komal Imitation Jewellery**, a premium jewellery shop based in Pune, Maharashtra. The website features:

- **Premium Design**: Luxurious gold accents with ivory/white backgrounds
- **Full E-Commerce**: Product browsing with advanced filters
- **Admin Panel**: Complete product, category, and content management
- **Responsive**: Mobile-first design that works on all devices
- **Performance**: Optimized images and smooth animations
- **SEO-Ready**: Proper meta tags and semantic HTML

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with serverless API routes
- **React 19** - Latest React version
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
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
- **Cloudinary** - Image hosting

## 📁 Project Structure

```
nextjs-app/
├── pages/
│   ├── api/               # Serverless API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── products/      # Product CRUD
│   │   ├── categories/    # Category management
│   │   ├── catalogs/      # Catalog management
│   │   ├── contact/       # Contact form
│   │   └── homepage/      # Homepage content
│   ├── admin/             # Admin panel pages
│   │   ├── login.js
│   │   ├── dashboard.js
│   │   └── [management pages]
│   ├── index.js           # Homepage
│   ├── products.js        # Products listing
│   ├── catalog.js         # Catalogs page
│   ├── about.js           # About us
│   ├── contact.js         # Contact page
│   ├── _app.js            # App wrapper
│   └── _document.js       # HTML document
├── components/            # Reusable components
│   ├── Navbar.js
│   ├── Footer.js
│   └── Layout.js
├── models/                # MongoDB models
│   ├── User.js
│   ├── Product.js
│   ├── Category.js
│   ├── Catalog.js
│   ├── HomePage.js
│   └── ContactMessage.js
├── lib/                   # Utilities
│   ├── mongodb.js         # Database connection
│   └── auth.js            # Auth middleware
├── styles/
│   └── globals.css        # Global styles
└── public/                # Static assets
```

## 🚀 Local Development Setup

### Prerequisites
- Node.js 18+ installed
- Yarn package manager
- MongoDB Atlas account (free tier works)
- Cloudinary account (optional, for image uploads)

### Step 1: Clone and Install

```bash
# Navigate to project directory
cd /app/nextjs-app

# Install dependencies
yarn install
```

### Step 2: Environment Variables

The `.env.local` file is already configured with:

```env
MONGODB_URI=mongodb+srv://gohelyash94_db_user:ux9l1TGPa29rc1k7@admin.s4ectaz.mongodb.net/komal_jewellery?retryWrites=true&w=majority
CLOUDINARY_CLOUD_NAME=dkinrfyq7
CLOUDINARY_API_KEY=199147376425354
CLOUDINARY_API_SECRET=yf-xnvBvO50SFSphu_JzEzNsXxQ
JWT_SECRET=komal_jewellery_secret_key_2026_secure
NEXT_PUBLIC_WHATSAPP=+918668586824
```

⚠️ **IMPORTANT FOR PRODUCTION**: Never commit `.env.local` to GitHub. These are provided for development only.

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
   - You'll get a live URL like `komal-jewellery.vercel.app`

### Custom Domain (Optional)

1. Go to Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS settings as instructed

## 🔐 Admin Setup

### First Login

1. Navigate to `/admin/login`
2. Use these credentials:
   ```
   Email: admin@komal.com
   Password: admin@komal.com
   ```
3. The system will automatically create the admin account on first login

### Admin Features

- **Products**: Add, edit, delete products with images
- **Categories**: Manage product categories
- **Catalogs**: Upload and manage PDF catalogs
- **Messages**: View contact form submissions
- **Homepage**: Edit hero section and about content

## 🖼️ Cloudinary Image Usage

The website uses Cloudinary for image hosting. Images are already uploaded and categorized.

### Using Images in Admin Panel

When adding products/categories, use Cloudinary URLs:
```
https://res.cloudinary.com/dkinrfyq7/image/upload/v1234567890/product-name.jpg
```

### Analyzing Existing Images

Images are pre-categorized into:
- Necklaces
- Earrings
- Bangles
- Rings
- Sets

The design guidelines at `/app/design_guidelines.json` contain pre-selected images.

## 📊 Database Schema

### Collections

1. **users** - Admin authentication
2. **products** - Product catalog
3. **categories** - Product categories
4. **catalogs** - Downloadable catalogs
5. **homepagecontents** - Homepage editable content
6. **contactmessages** - Contact form submissions

### Product Model
```javascript
{
  name: String,
  categoryId: ObjectId,
  imageUrl: String,
  price: Number,
  size: String,
  gender: 'Male' | 'Female' | 'Unisex',
  description: String,
  featured: Boolean
}
```

## 🎨 Design System

The website follows a luxury design system:

### Colors
- **Primary Gold**: #D4AF37
- **Background**: #FFFFFF (White)
- **Secondary**: #F9F5F0 (Ivory)
- **Text**: #1A1A1A
- **Muted**: #666666

### Typography
- **Headings**: Playfair Display (Serif)
- **Body**: Lato (Sans-serif)

### Animations
- Minimal and classy
- Fade + slide on scroll
- Hover effects on cards
- Smooth transitions

## 🔧 API Endpoints

### Public Endpoints
- `GET /api/products` - Get all products (with filters)
- `GET /api/categories` - Get all categories
- `GET /api/catalogs` - Get all catalogs
- `GET /api/homepage` - Get homepage content
- `POST /api/contact` - Submit contact form

### Protected Endpoints (Require JWT)
- `POST /api/products` - Create product
- `PUT /api/products` - Update product
- `DELETE /api/products` - Delete product
- `POST /api/categories` - Create category
- `PUT /api/homepage` - Update homepage content

### Authentication
```javascript
// Login
POST /api/auth/login
Body: { email, password }
Response: { token, user }

// Use token in headers
Authorization: Bearer <token>
```

## 📱 Features

### Public Features
- ✅ Responsive homepage with hero section
- ✅ Product browsing with filters (category, gender, price)
- ✅ Category-based navigation
- ✅ Downloadable catalogs
- ✅ About us page with local business story
- ✅ Contact form with WhatsApp integration
- ✅ Google Maps integration
- ✅ Smooth animations and transitions

### Admin Features
- ✅ Secure JWT authentication
- ✅ Product management (CRUD)
- ✅ Category management
- ✅ Catalog management
- ✅ Homepage content editing
- ✅ Contact form message viewing
- ✅ Dashboard with statistics

## 🔒 Security Notes

### For Production Deployment:

1. **Change Default Credentials**
   - Update admin email/password after first login
   - Store in secure password manager

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
   - Use Cloudinary signed uploads for production

## 🐛 Troubleshooting

### Build Errors

**Issue**: `Module not found`
```bash
rm -rf node_modules .next
yarn install
yarn build
```

**Issue**: MongoDB connection timeout
- Check MONGODB_URI format
- Verify MongoDB Atlas network access
- Ensure cluster is active

### Runtime Issues

**Issue**: Images not loading
- Verify Cloudinary URLs
- Check `next.config.js` image domains
- Ensure proper CORS settings

**Issue**: Admin login fails
- Check JWT_SECRET is set
- Verify MongoDB connection
- Check browser console for errors

## 📞 Support

### Business Information
**Komal Imitation Jewellery**
- **Location**: Shubhansha Darga, Bohri Ali, 330, Borali, Rameshwar Chouk, Raviwar Peth, Pune, Maharashtra 411002
- **Phone**: +91 86685 86824
- **Hours**: Open Daily, 9:00 AM - 9:00 PM
- **Rating**: 5.0 on Google Maps

### Technical Support
For technical issues or questions:
1. Check this README
2. Review error logs
3. Check MongoDB Atlas logs
4. Check Vercel deployment logs

## 📄 License

This project is proprietary and confidential. All rights reserved by Komal Imitation Jewellery.

## 🎯 Next Steps After Deployment

1. **Add Initial Content**
   - Log into admin panel
   - Add categories (Necklaces, Earrings, Bangles, Rings)
   - Upload products with Cloudinary images
   - Upload catalog PDFs

2. **SEO Optimization**
   - Submit sitemap to Google Search Console
   - Set up Google Analytics
   - Add structured data markup

3. **Marketing**
   - Share WhatsApp number with customers
   - Add website link to Google My Business
   - Promote on social media

4. **Monitoring**
   - Set up Vercel analytics
   - Monitor contact form submissions
   - Track product views

---

Built with ❤️ for Komal Imitation Jewellery
