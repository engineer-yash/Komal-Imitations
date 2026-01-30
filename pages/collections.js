import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import axios from 'axios';

export default function Collections() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const res = await axios.get('/api/collections');
      setCollections(res.data);
    } catch (error) {
      console.error('Error fetching collections:', error);
    } finally {
      setLoading(false);
    }
  };

  // Create masonry layout with randomized heights
  const getRandomHeight = (index) => {
    const heights = ['h-64', 'h-80', 'h-96', 'h-72'];
    return heights[index % heights.length];
  };

  return (
    <Layout>
      <Head>
        <title>Our Collections - Komal Imitation Jewellery</title>
        <meta name="description" content="Explore our exclusive jewellery collections crafted with elegance" />
      </Head>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-secondary to-primary/5 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold font-playfair text-gray-900 mb-6">
              Our Collections
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our curated collection of exquisite jewellery pieces, each telling its own story of elegance and craftsmanship
            </p>
          </motion.div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : collections.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">✨</div>
              <h3 className="text-2xl font-playfair font-semibold text-gray-900 mb-2">
                Collections Coming Soon
              </h3>
              <p className="text-gray-600">
                We're curating something special for you. Check back soon!
              </p>
            </motion.div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6" data-testid="collections-masonry">
              {collections.map((collection, index) => (
                <motion.div
                  key={collection._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="break-inside-avoid group"
                  data-testid={`collection-item-${index}`}
                >
                  <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-all duration-500 bg-white">
                    <div className={`relative ${getRandomHeight(index)} overflow-hidden`}>
                      <Image
                        src={collection.imageUrl}
                        alt={collection.title || 'Collection Image'}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Overlay on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          {collection.title && (
                            <h3 className="text-xl font-playfair font-bold mb-2">
                              {collection.title}
                            </h3>
                          )}
                          {collection.description && (
                            <p className="text-sm text-white/90 line-clamp-3">
                              {collection.description}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      {/* Gold Border Accent */}
                      <div className="absolute inset-0 border-4 border-primary/0 group-hover:border-primary/50 transition-all duration-500 pointer-events-none" />
                    </div>
                    
                    {/* Bottom Title (visible without hover) */}
                    {collection.title && (
                      <div className="p-4 bg-white">
                        <h3 className="font-playfair font-semibold text-gray-900 text-center">
                          {collection.title}
                        </h3>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-secondary to-primary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-playfair text-gray-900 mb-4">
              Love What You See?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Explore our full product range or get in touch to find your perfect piece
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/products"
                className="inline-block bg-primary text-white px-8 py-3 rounded-full hover:bg-[#B5952F] transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                data-testid="view-products-cta"
              >
                View All Products
              </a>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP?.replace(/\+/g, '') || '918668586824'}?text=Hi, I'm interested in your jewellery collections!`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                data-testid="whatsapp-cta"
              >
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
