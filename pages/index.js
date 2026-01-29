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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [homeRes, productsRes, categoriesRes] = await Promise.all([
        axios.get('/api/homepage'),
        axios.get('/api/products?featured=true'),
        axios.get('/api/categories'),
      ]);
      setHomeContent(homeRes.data);
      setFeaturedProducts(productsRes.data.slice(0, 4));
      setCategories(categoriesRes.data.slice(0, 4));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP || '+919876543210';

  return (
    <Layout>
      <Head>
        <title>Komal Imitation Jewellery - Timeless Elegance</title>
        <meta name="description" content="Premium imitation jewellery in Pune. Discover elegant designs for every occasion." />
      </Head>

      <section className="relative h-[600px] md:h-[700px] overflow-hidden" data-testid="hero-section">
        <div className="absolute inset-0">
          <Image
            src={homeContent?.heroImage || 'https://images.unsplash.com/photo-1737515046830-1680d82e043c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODR8MHwxfHNlYXJjaHwzfHxpbmRpYW4lMjBtb2RlbCUyMHdlYXJpbmclMjBoZWF2eSUyMGdvbGQlMjBqZXdlbGxlcnklMjBwb3J0cmFpdCUyMGx1eHVyeXxlbnwwfHx8fDE3Njk2ODQ1MTR8MA&ixlib=rb-4.1.0&q=85'}
            alt="Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
        </div>
        
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-playfair">
                {homeContent?.heroTitle || 'Timeless Elegance, Everyday Luxury'}
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                {homeContent?.heroSubtitle || 'Discover exquisite imitation jewellery that captures the essence of tradition'}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className="bg-primary text-white hover:bg-[#B5952F] rounded-full px-8 py-3 transition-all duration-300 shadow-lg hover:shadow-xl"
                  data-testid="shop-now-button"
                >
                  Shop Now
                </Link>
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/\+/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-foreground rounded-full px-8 py-3 transition-all duration-300"
                  data-testid="whatsapp-button"
                >
                  WhatsApp Us
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {categories.length > 0 && (
        <section className="py-16 md:py-24 bg-white" data-testid="categories-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-semibold font-playfair mb-4">Shop by Category</h2>
              <p className="text-muted-foreground">Discover our curated collections</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={category._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/products?category=${category._id}`} className="group">
                    <div className="relative h-48 md:h-64 overflow-hidden bg-secondary transition-all duration-300 hover:shadow-lg">
                      {category.imageUrl && (
                        <Image
                          src={category.imageUrl}
                          alt={category.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white text-lg font-semibold font-playfair">{category.name}</h3>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {featuredProducts.length > 0 && (
        <section className="py-16 md:py-24 bg-secondary" data-testid="featured-products-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-semibold font-playfair mb-4">Featured Collection</h2>
              <p className="text-muted-foreground">Handpicked pieces for you</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-white overflow-hidden transition-all duration-300 hover:shadow-xl"
                  data-testid={`featured-product-${index}`}
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 text-sm md:text-base">{product.name}</h3>
                    <p className="text-primary font-bold">₹{product.price.toLocaleString()}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                href="/products"
                className="inline-block bg-primary text-white hover:bg-[#B5952F] rounded-full px-8 py-3 transition-all duration-300"
                data-testid="view-all-products-button"
              >
                View All Products
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="py-16 md:py-24 bg-white" data-testid="trust-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 bg-secondary hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-semibold mb-2 font-playfair">Premium Quality</h3>
              <p className="text-muted-foreground text-sm">Carefully crafted pieces that last</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="p-8 bg-secondary hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-4xl mb-4">🏪</div>
              <h3 className="text-xl font-semibold mb-2 font-playfair">Local Business</h3>
              <p className="text-muted-foreground text-sm">Trusted in Pune since years</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="p-8 bg-secondary hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-4xl mb-4">💎</div>
              <h3 className="text-xl font-semibold mb-2 font-playfair">Wide Collection</h3>
              <p className="text-muted-foreground text-sm">Styles for every occasion</p>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
