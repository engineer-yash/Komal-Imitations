import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import axios from 'axios';

export default function Home() {
  const [homeContent, setHomeContent] = useState(null);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (testimonials.length > 1) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [testimonials]);

  const fetchData = async () => {
    try {
      const [homeRes, productsRes, categoriesRes, collectionsRes, testimonialsRes] = await Promise.all([
        axios.get('/api/homepage'),
        axios.get('/api/products?featured=true'),
        axios.get('/api/categories'),
        axios.get('/api/collections'),
        axios.get('/api/testimonials?featured=true'),
      ]);
      setHomeContent(homeRes.data);
      setFeaturedProducts(productsRes.data.slice(0, 8));
      setCategories(categoriesRes.data.slice(0, 4));
      setCollections(collectionsRes.data.slice(0, 6));
      setTestimonials(testimonialsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP || '+919876543210';

  return (
    <Layout>
      <Head>
        <title>Komal Imitation Jewellery - Timeless Elegance in Pune</title>
        <meta name="description" content="Premium imitation jewellery in Pune. Discover elegant designs for every occasion. Shop necklaces, earrings, bangles, and more." />
      </Head>

      {/* Hero Section with Parallax */}
      <section className="relative h-[700px] md:h-[800px] overflow-hidden" data-testid="hero-section">
        <motion.div 
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Image
            src={homeContent?.heroImage || 'https://images.unsplash.com/photo-1737515046830-1680d82e043c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODR8MHwxfHNlYXJjaHwzfHxpbmRpYW4lMjBtb2RlbCUyMHdlYXJpbmclMjBoZWF2eSUyMGdvbGQlMjBqZXdlbGxlcnklMjBwb3J0cmFpdCUyMGx1eHVyeXxlbnwwfHx8fDE3Njk2ODQ1MTR8MA&ixlib=rb-4.1.0&q=85'}
            alt="Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        </motion.div>
        
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-3xl"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="inline-block mb-4 px-6 py-2 bg-primary/20 backdrop-blur-sm border border-primary/50 rounded-full"
              >
                <span className="text-primary font-semibold text-sm tracking-wide">✨ PREMIUM COLLECTION</span>
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-playfair leading-tight">
                {homeContent?.heroTitle || 'Timeless Elegance, Everyday Luxury'}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                {homeContent?.heroSubtitle || 'Discover exquisite imitation jewellery that captures the essence of tradition'}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className="group bg-primary text-white hover:bg-[#B5952F] rounded-full px-10 py-4 text-lg font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                  data-testid="shop-now-button"
                >
                  <span className="flex items-center">
                    Shop Collection
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/\+/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-foreground rounded-full px-10 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
                  data-testid="whatsapp-button"
                >
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    WhatsApp Us
                  </span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="text-white text-center">
            <p className="text-sm mb-2">Scroll to explore</p>
            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </section>

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="py-20 md:py-28 bg-white" data-testid="categories-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-semibold font-playfair mb-4">Shop by Category</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Explore our curated collections of traditional and contemporary designs</p>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={category._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <Link href={`/products?category=${category._id}`}>
                    <div className="relative h-72 md:h-80 overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl">
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
                        <h3 className="text-white text-xl md:text-2xl font-semibold font-playfair mb-2">{category.name}</h3>
                        <p className="text-white/80 text-sm group-hover:text-primary transition-colors">Explore →</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Collections Carousel */}
      {collections.length > 0 && (
        <section className="py-20 md:py-28 bg-gradient-to-b from-secondary to-white" data-testid="collections-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-semibold font-playfair mb-4">Featured Collections</h2>
              <p className="text-lg text-muted-foreground">Handpicked selections from our latest arrivals</p>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {collections.map((collection, index) => (
                <motion.div
                  key={collection._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative h-72 md:h-96">
                    <Image
                      src={collection.imageUrl}
                      alt={collection.title || 'Collection'}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {collection.title && (
                      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-white text-xl font-semibold font-playfair">{collection.title}</h3>
                        {collection.description && (
                          <p className="text-white/80 text-sm mt-2">{collection.description}</p>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="py-20 md:py-28 bg-white" data-testid="featured-products-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-semibold font-playfair mb-4">Featured Products</h2>
              <p className="text-lg text-muted-foreground">Discover our most loved pieces</p>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
                  data-testid={`featured-product-${index}`}
                >
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Featured
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 text-sm md:text-base group-hover:text-primary transition-colors">{product.name}</h3>
                    <p className="text-primary font-bold text-lg">₹{product.price.toLocaleString()}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                href="/products"
                className="inline-block bg-primary text-white hover:bg-[#B5952F] rounded-full px-10 py-4 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                data-testid="view-all-products-button"
              >
                View All Products
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="py-20 md:py-28 bg-gradient-to-b from-secondary to-white" data-testid="testimonials-section">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-semibold font-playfair mb-4">What Our Customers Say</h2>
              <p className="text-lg text-muted-foreground">Real experiences from real customers</p>
            </motion.div>
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
            >
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                {testimonials[currentTestimonial].imageUrl ? (
                  <img
                    src={testimonials[currentTestimonial].imageUrl}
                    alt={testimonials[currentTestimonial].name}
                    className="w-24 h-24 rounded-full object-cover shadow-lg"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center text-4xl font-bold shadow-lg">
                    {testimonials[currentTestimonial].name.charAt(0)}
                  </div>
                )}
                <div className="flex-1 text-center md:text-left">
                  <div className="text-yellow-400 text-2xl mb-4">
                    {'⭐'.repeat(testimonials[currentTestimonial].rating)}
                  </div>
                  <p className="text-xl md:text-2xl text-gray-700 mb-6 italic leading-relaxed">
                    "{testimonials[currentTestimonial].text}"
                  </p>
                  <div>
                    <p className="font-bold text-lg">{testimonials[currentTestimonial].name}</p>
                    {testimonials[currentTestimonial].designation && (
                      <p className="text-muted-foreground">{testimonials[currentTestimonial].designation}</p>
                    )}
                  </div>
                </div>
              </div>
              {testimonials.length > 1 && (
                <div className="flex justify-center mt-8 space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentTestimonial ? 'bg-primary w-8' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* Trust Badges Section */}
      <section className="py-20 md:py-28 bg-white" data-testid="trust-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center p-8 bg-gradient-to-br from-secondary to-white rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-6xl mb-4">✨</div>
              <h3 className="text-2xl font-semibold mb-3 font-playfair">Premium Quality</h3>
              <p className="text-muted-foreground leading-relaxed">Carefully crafted pieces that last. Each design is inspected for excellence</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center p-8 bg-gradient-to-br from-secondary to-white rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-6xl mb-4">🏪</div>
              <h3 className="text-2xl font-semibold mb-3 font-playfair">Trusted in Pune</h3>
              <p className="text-muted-foreground leading-relaxed">Serving the community with dedication. 5.0 rated on Google Maps</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center p-8 bg-gradient-to-br from-secondary to-white rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-6xl mb-4">💎</div>
              <h3 className="text-2xl font-semibold mb-3 font-playfair">Wide Collection</h3>
              <p className="text-muted-foreground leading-relaxed">Styles for every occasion. From traditional to contemporary designs</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-primary to-[#B5952F] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-6">Visit Our Store in Pune</h2>
            <p className="text-xl mb-8 text-white/90">Experience our collection firsthand and get personalized recommendations</p>
            <div className="space-y-4 mb-8">
              <p className="text-lg">Shubhansha Darga, Bohri Ali, Raviwar Peth</p>
              <p className="text-lg">Pune, Maharashtra 411002</p>
              <p className="text-lg font-semibold">Open Daily: 9:00 AM - 9:00 PM</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`https://wa.me/${whatsappNumber.replace(/\+/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary hover:bg-gray-100 rounded-full px-10 py-4 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Contact Us on WhatsApp
              </a>
              <Link
                href="/contact"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary rounded-full px-10 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                Get Directions
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
