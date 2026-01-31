import { useEffect, useState } from 'react';
import Head from 'next/head';
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

  // Extract YouTube Shorts ID from URL
  const getYouTubeEmbedUrl = (url) => {
    try {
      // Handle youtube.com/shorts/xxxxx format
      const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
      if (shortsMatch) return `https://www.youtube.com/embed/${shortsMatch[1]}`;
      
      // Handle youtu.be/xxxxx format
      const youtubeMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
      if (youtubeMatch) return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
      
      // Handle youtube.com/watch?v=xxxxx format
      const watchMatch = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
      if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
      
      return null;
    } catch (error) {
      console.error('Error parsing YouTube URL:', error);
      return null;
    }
  };

  // Extract Instagram Reel ID from URL
  const getInstagramEmbedUrl = (url) => {
    try {
      // Handle instagram.com/reel/xxxxx format
      const reelMatch = url.match(/instagram\.com\/reel\/([a-zA-Z0-9_-]+)/);
      if (reelMatch) return `https://www.instagram.com/reel/${reelMatch[1]}/embed/`;
      
      // Handle instagram.com/p/xxxxx format (posts)
      const postMatch = url.match(/instagram\.com\/p\/([a-zA-Z0-9_-]+)/);
      if (postMatch) return `https://www.instagram.com/p/${postMatch[1]}/embed/`;
      
      return null;
    } catch (error) {
      console.error('Error parsing Instagram URL:', error);
      return null;
    }
  };

  // Separate collections by type
  const youtubeCollections = collections.filter(c => c.mediaType === 'youtube' && c.mediaUrl);
  const instagramCollections = collections.filter(c => c.mediaType === 'instagram' && c.mediaUrl);

  return (
    <Layout>
      <Head>
        <title>Our Collections - Komal Imitation Jewellery</title>
        <meta name="description" content="Watch our exclusive jewellery collections on YouTube Shorts and Instagram Reels" />
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
              Watch our stunning jewellery collections come to life through our YouTube Shorts and Instagram Reels
            </p>
          </motion.div>
        </div>
      </section>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {/* YouTube Shorts Section */}
          {youtubeCollections.length > 0 && (
            <section className="py-12 md:py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-12"
                >
                  <div className="flex items-center justify-center mb-4">
                    <svg className="w-10 h-10 text-red-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    <h2 className="text-3xl md:text-4xl font-bold font-playfair text-gray-900">
                      YouTube Shorts
                    </h2>
                  </div>
                  <p className="text-center text-gray-600">
                    Quick glimpses of our latest designs and collections
                  </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {youtubeCollections.map((collection, index) => {
                    const embedUrl = getYouTubeEmbedUrl(collection.mediaUrl);
                    if (!embedUrl) return null;

                    return (
                      <motion.div
                        key={collection._id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group"
                        data-testid={`youtube-short-${index}`}
                      >
                        <div className="relative bg-black rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300" style={{ paddingBottom: '177.78%' }}>
                          <iframe
                            src={embedUrl}
                            className="absolute top-0 left-0 w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={collection.title || 'YouTube Short'}
                          />
                        </div>
                        {collection.title && (
                          <h3 className="mt-3 text-sm md:text-base font-semibold text-gray-900 text-center line-clamp-2">
                            {collection.title}
                          </h3>
                        )}
                        {collection.description && (
                          <p className="mt-1 text-xs text-gray-600 text-center line-clamp-2">
                            {collection.description}
                          </p>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* Instagram Reels Section */}
          {instagramCollections.length > 0 && (
            <section className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-12"
                >
                  <div className="flex items-center justify-center mb-4">
                    <svg className="w-10 h-10 text-pink-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    <h2 className="text-3xl md:text-4xl font-bold font-playfair text-gray-900">
                      Instagram Reels
                    </h2>
                  </div>
                  <p className="text-center text-gray-600">
                    Explore our jewellery in stunning detail
                  </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {instagramCollections.map((collection, index) => {
                    const embedUrl = getInstagramEmbedUrl(collection.mediaUrl);
                    if (!embedUrl) return null;

                    return (
                      <motion.div
                        key={collection._id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group"
                        data-testid={`instagram-reel-${index}`}
                      >
                        <div className="relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300" style={{ paddingBottom: '177.78%' }}>
                          <iframe
                            src={embedUrl}
                            className="absolute top-0 left-0 w-full h-full"
                            frameBorder="0"
                            scrolling="no"
                            allowTransparency="true"
                            allow="encrypted-media"
                            title={collection.title || 'Instagram Reel'}
                          />
                        </div>
                        {collection.title && (
                          <h3 className="mt-3 text-sm md:text-base font-semibold text-gray-900 text-center line-clamp-2">
                            {collection.title}
                          </h3>
                        )}
                        {collection.description && (
                          <p className="mt-1 text-xs text-gray-600 text-center line-clamp-2">
                            {collection.description}
                          </p>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* Empty State */}
          {youtubeCollections.length === 0 && instagramCollections.length === 0 && (
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
          )}
        </>
      )}

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
