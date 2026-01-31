import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import axios from 'axios';

export default function Home() {
  const [homeContent, setHomeContent] = useState(null);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    // Always fetch data when component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [homeRes, productsRes, categoriesRes, testimonialsRes, allProductsRes] = await Promise.all([
        axios.get('/api/homepage'),
        axios.get('/api/products?featured=true'),
        axios.get('/api/categories'),
        axios.get('/api/testimonials'),
        axios.get('/api/products'),
      ]);
      setHomeContent(homeRes.data);
      setFeaturedProducts(productsRes.data.slice(0, 4));
      setCategories(categoriesRes.data.slice(0, 4));
      setTestimonials(testimonialsRes.data.filter(t => t.featured).slice(0, 6));
      setProducts(allProductsRes.data.slice(0, 12));
      setDataLoaded(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP || '+919876543210';

  // Auto-slide for product highlights
  useEffect(() => {
    if (products.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % Math.ceil(products.length / 4));
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [products.length]);

  const getVisibleProducts = () => {
    const startIndex = currentSlide * 4;
    return products.slice(startIndex, startIndex + 4);
  };

  return (
    <Layout>
      <Head>
        <title>Komal Jewellers - Timeless Elegance & Premium Jewellery</title>
        <meta name="description" content="Discover exquisite imitation jewellery in Pune. Premium designs for every occasion." />
      </Head>

      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-secondary">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-20 w-20 border-4 border-primary border-t-transparent mb-4"></div>
            <p className="text-xl text-gray-600">Loading...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Hero Section - Enhanced */}
          <section className="relative h-[600px] md:h-[750px] overflow-hidden" data-testid="hero-section">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <Image
            src={homeContent?.heroImage || 'https://images.unsplash.com/photo-1737515046830-1680d82e043c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODR8MHwxfHNlYXJjaHwzfHxpbmRpYW4lMjBtb2RlbCUyMHdlYXJpbmclMjBoZWF2eSUyMGdvbGQlMjBqZXdlbGxlcnklMjBwb3J0cmFpdCUyMGx1eHVyeXxlbnwwfHx8fDE3Njk2ODQ1MTR8MA&ixlib=rb-4.1.0&q=85'}
            alt="Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </motion.div>
        
        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute top-20 right-10 w-64 h-64 border-2 border-primary rounded-full"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="absolute bottom-10 left-10 w-96 h-96 border-2 border-primary rounded-full"
        />
        
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex items-center justify-between">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="max-w-2xl"
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="inline-block bg-primary/20 backdrop-blur-sm border border-primary/30 px-6 py-2 rounded-full mb-6"
                >
                  <span className="text-white text-sm font-medium">Premium Quality | Affordable Luxury</span>
                </motion.div>
                
                <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 font-playfair leading-tight">
                  {homeContent?.heroTitle || 'Timeless Elegance, Everyday Luxury'}
                </h1>
                <p className="text-lg md:text-2xl text-white/90 mb-10 leading-relaxed">
                  {homeContent?.heroSubtitle || 'Discover exquisite imitation jewellery that captures the essence of tradition'}
                </p>
                <div className="flex flex-wrap gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="/products"
                      className="bg-primary text-white hover:bg-[#B5952F] rounded-full px-10 py-4 transition-all duration-300 shadow-2xl hover:shadow-primary/50 font-medium inline-block"
                      data-testid="shop-now-button"
                    >
                      Shop Now ✨
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a
                      href={`https://wa.me/${whatsappNumber.replace(/\+/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-foreground rounded-full px-10 py-4 transition-all duration-300 font-medium inline-block"
                      data-testid="whatsapp-button"
                    >
                      WhatsApp Us
                    </a>
                  </motion.div>
                </div>
              </motion.div>

              {/* Logo Overlay on Right Side */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="hidden lg:block relative w-64 h-64 xl:w-80 xl:h-80"
              >
                <Image
                  src="https://res.cloudinary.com/dkinrfyq7/image/upload/v1769839541/Logo_p6yljj.png"
                  alt="Komal Jewellery"
                  fill
                  className="object-contain opacity-90"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Highlights Carousel - NEW */}
      {products.length > 0 && (
        <section className="py-12 bg-gradient-to-b from-gray-50 to-white" data-testid="highlights-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl md:text-4xl font-semibold font-playfair mb-2"
              >
                ✨ Today's Highlights
              </motion.h2>
              <p className="text-muted-foreground">Trending pieces everyone loves</p>
            </div>
            
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                  {getVisibleProducts().map((product, index) => (
                    <motion.div
                      key={product._id}
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-primary text-white text-xs px-3 py-1 rounded-full">
                          New
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-sm truncate mb-2">{product.name}</h3>
                        {product.price ? (
                          <p className="text-primary font-bold">₹{product.price.toLocaleString()}</p>
                        ) : (
                          <p className="text-primary font-semibold text-xs">Visit Shop For Price</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
              
              {/* Carousel indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: Math.ceil(products.length / 4) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentSlide === index ? 'bg-primary w-8' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Categories Section - Enhanced */}
      {categories.length > 0 && (
        <section className="py-16 md:py-24 bg-white" data-testid="categories-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-5xl font-semibold font-playfair mb-4">Shop by Category</h2>
              <p className="text-muted-foreground text-lg">Discover our curated collections</p>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={category._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <Link href={`/products?category=${category._id}`} className="group block">
                    <div className="relative h-48 md:h-64 overflow-hidden rounded-2xl bg-secondary transition-all duration-300 group-hover:shadow-2xl">
                      {category.imageUrl && (
                        <Image
                          src={category.imageUrl}
                          alt={category.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-white text-lg md:text-xl font-semibold font-playfair transform transition-transform duration-300 group-hover:translate-y-[-4px]">
                          {category.name}
                        </h3>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: '40px' }}
                          transition={{ delay: 0.3 }}
                          className="h-1 bg-primary mt-2"
                        />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products - Enhanced */}
      {featuredProducts.length > 0 && (
        <section className="py-16 md:py-24 bg-secondary" data-testid="featured-products-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-5xl font-semibold font-playfair mb-4">Featured Collection</h2>
              <p className="text-muted-foreground text-lg">Handpicked pieces crafted to perfection</p>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
                  data-testid={`featured-product-${index}`}
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-3 right-3 bg-primary text-white text-xs px-3 py-1 rounded-full font-medium">
                      Featured
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold mb-2 text-sm md:text-base">{product.name}</h3>
                    {product.price ? (
                      <p className="text-primary font-bold text-lg">₹{product.price.toLocaleString()}</p>
                    ) : (
                      <p className="text-primary font-semibold text-sm">Visit Shop For Price</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link
                href="/products"
                className="inline-block bg-primary text-white hover:bg-[#B5952F] rounded-full px-10 py-4 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                data-testid="view-all-products-button"
              >
                View All Products →
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Customer Testimonials - NEW */}
      {testimonials.length > 0 && (
        <section className="py-16 md:py-24 bg-white" data-testid="testimonials-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-5xl font-semibold font-playfair mb-4">What Our Customers Say</h2>
              <p className="text-muted-foreground text-lg">Real experiences from real people</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-secondary to-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    {testimonial.imageUrl ? (
                      <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                        <Image
                          src={testimonial.imageUrl}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mr-4">
                        {testimonial.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                      {testimonial.designation && (
                        <p className="text-sm text-gray-600">{testimonial.designation}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-yellow-400 text-lg mb-3">
                    {'⭐'.repeat(testimonial.rating)}
                  </div>
                  
                  <p className="text-gray-700 italic leading-relaxed">
                    "{testimonial.text}"
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trust Section - Enhanced */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-secondary via-white to-secondary" data-testid="trust-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-semibold font-playfair mb-4">Why Choose Komal Jewellers</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="p-10 bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300"
            >
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="text-6xl mb-6"
              >
                ✨
              </motion.div>
              <h3 className="text-2xl font-semibold mb-3 font-playfair">Premium Quality</h3>
              <p className="text-muted-foreground leading-relaxed">Carefully crafted pieces with attention to every detail</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="p-10 bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300"
            >
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.3 }}
                className="text-6xl mb-6"
              >
                🏪
              </motion.div>
              <h3 className="text-2xl font-semibold mb-3 font-playfair">Trusted in Pune</h3>
              <p className="text-muted-foreground leading-relaxed">Serving customers with excellence for years</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="p-10 bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300"
            >
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.4 }}
                className="text-6xl mb-6"
              >
                💎
              </motion.div>
              <h3 className="text-2xl font-semibold mb-3 font-playfair">Wide Collection</h3>
              <p className="text-muted-foreground leading-relaxed">Styles for every occasion and celebration</p>
            </motion.div>
          </div>
        </div>
      </section>
      </>
      )}
    </Layout>
  );
}
