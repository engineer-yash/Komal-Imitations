import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import axios from 'axios';

export default function About() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch content on every mount to ensure fresh data
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/homepage');
      setContent(res.data);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Head>
        <title>About Us - Komal Jewellers | Premium Jewellery in Pune</title>
        <meta name="description" content="Learn about Komal Jewellers, your trusted jewellery destination in Pune. Offering premium imitation jewellery since years." />
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
          {/* Hero Section */}
          <div className="relative bg-gradient-to-br from-primary/10 via-secondary to-primary/5 py-12 md:py-20 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 border-4 border-primary rounded-full"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          className="absolute bottom-0 left-0 w-48 h-48 md:w-64 md:h-64 border-4 border-primary rounded-full"
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold font-playfair mb-4 md:mb-6 text-primary px-2">
              About Komal Jewellers
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto px-4">
              Crafting timeless elegance and bringing affordable luxury to Pune since our inception
            </p>
          </motion.div>
        </div>
      </div>

      {/* Our Story */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block bg-primary/10 px-4 py-2 rounded-full mb-4">
              <span className="text-primary font-semibold text-xs sm:text-sm">OUR STORY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-playfair mb-4 md:mb-6">
              {content?.aboutTitle || 'Crafted with Passion in the Heart of Pune'}
            </h2>
            <div className="space-y-4 md:space-y-6 text-gray-600 text-base md:text-lg leading-relaxed">
              <p>
                {content?.aboutText || 'Located in the vibrant heart of Raviwar Peth, Pune, Komal Jewellers has been serving customers with beautiful, affordable jewellery that doesn\'t compromise on quality or design. Our journey began with a simple vision: to make elegant jewellery accessible to everyone.'}
              </p>
              <p>
                We specialize in premium imitation jewellery that captures the grandeur of traditional designs while embracing contemporary aesthetics. Each piece in our collection is carefully curated to ensure it meets our high standards of craftsmanship and beauty.
              </p>
              <p>
                From elaborate bridal sets to everyday elegance, our collection caters to every occasion. Whether you're preparing for a wedding, attending a festival, or simply want to add a touch of glamour to your daily life, you'll find the perfect piece at Komal Jewellers.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={content?.aboutImage || 'https://images.unsplash.com/photo-1744196988043-78466f6ed98a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwyfHxpbmRpYW4lMjBqZXdlbGxlcnklMjBjcmFmdHNtYW4lMjB3b3JraW5nJTIwY2xvc2UlMjB1cHxlbnwwfHx8fDE3Njk2ODQ1Mzl8MA&ixlib=rb-4.1.0&q=85'}
                alt="Komal Jewellers Store"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-24 h-24 md:w-32 md:h-32 bg-primary rounded-3xl -z-10" />
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-secondary via-white to-secondary p-6 sm:p-8 md:p-12 lg:p-16 rounded-3xl mb-12 md:mb-20"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold font-playfair text-center mb-8 md:mb-16">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="bg-white w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg">
                <span className="text-3xl md:text-4xl">✨</span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 font-playfair">Quality Craftsmanship</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Every piece is meticulously selected and crafted to ensure exceptional durability and timeless beauty that lasts for generations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-white w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg">
                <span className="text-3xl md:text-4xl">💰</span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 font-playfair">Affordable Luxury</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Premium designs at prices that make luxury accessible to everyone. We believe elegance shouldn't come with a premium price tag.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="bg-white w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg">
                <span className="text-3xl md:text-4xl">❤️</span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 font-playfair">Customer First</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Your satisfaction is our priority. Our team is dedicated to helping you find the perfect piece that matches your style and occasion.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <div className="mb-12 md:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-semibold font-playfair text-center mb-8 md:mb-12"
          >
            Why Shop With Us
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                icon: '🎨',
                title: 'Diverse Collection',
                description: 'From traditional to contemporary designs, we offer a wide range of styles to suit every taste and occasion.'
              },
              {
                icon: '🛡️',
                title: 'Quality Assured',
                description: 'Each piece undergoes rigorous quality checks to ensure you receive only the finest jewellery.'
              },
              {
                icon: '💎',
                title: 'Expert Guidance',
                description: 'Our knowledgeable team helps you choose the perfect pieces that complement your style.'
              },
              {
                icon: '⚡',
                title: 'Latest Trends',
                description: 'Stay ahead with our regularly updated collection featuring the latest designs and trends.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="flex items-start space-x-3 md:space-x-4 p-4 md:p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="text-3xl md:text-4xl flex-shrink-0">{item.icon}</div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2 font-playfair">{item.title}</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Visit Our Store */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary to-[#B5952F] text-white rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-playfair mb-4 md:mb-6">Visit Our Store</h2>
          <p className="text-lg sm:text-xl mb-6 md:mb-8 opacity-90">Experience our exquisite collection in person</p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 max-w-2xl mx-auto">
            <p className="text-xl sm:text-2xl font-semibold mb-3 md:mb-4">Komal Jewellers</p>
            <div className="space-y-1 md:space-y-2 text-base sm:text-lg opacity-90">
              <p>Shubhansha Darga, Bohri Ali</p>
              <p>330, Borali, Rameshwar Chouk</p>
              <p>Raviwar Peth, Pune, Maharashtra 411002</p>
            </div>
            <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-white/20">
              <p className="text-base sm:text-lg">
                <span className="font-semibold">Hours:</span> Open Daily, 9:00 AM - 9:00 PM
              </p>
            </div>
          </div>

          <div className="mt-6 md:mt-10">
            <a
              href="https://maps.google.com/?q=Komal+Jewellery+Pune"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-primary hover:bg-gray-100 rounded-full px-8 sm:px-10 py-3 sm:py-4 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              Get Directions 📍
            </a>
          </div>
        </motion.div>
      </div>
      </>
      )}
    </Layout>
  );
}
