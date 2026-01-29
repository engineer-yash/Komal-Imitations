import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import axios from 'axios';

export default function About() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await axios.get('/api/homepage');
      setContent(res.data);
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  return (
    <Layout>
      <Head>
        <title>About Us - Komal Imitation Jewellery</title>
        <meta name="description" content="Learn about Komal Imitation Jewellery, your trusted jewellery shop in Pune" />
      </Head>

      <div className="bg-secondary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold font-playfair text-center">About Us</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold font-playfair mb-6">
              {content?.aboutTitle || 'Crafted with Passion in Pune'}
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                {content?.aboutText || 'Located in the heart of Raviwar Peth, Pune, Komal Imitation Jewellery has been serving customers with beautiful, affordable jewellery since our inception. Our collection blends traditional designs with contemporary styles, perfect for weddings, festivals, and everyday elegance.'}
              </p>
              <p>
                At Komal Jewellery, we believe that elegance should be accessible to everyone. Our carefully curated collection features high-quality imitation jewellery that rivals the beauty of fine jewellery, without the premium price tag.
              </p>
              <p>
                Visit us at our store in Raviwar Peth to experience our collection firsthand, or browse our website to discover pieces that speak to your style.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[400px] md:h-[500px]"
          >
            <Image
              src={content?.aboutImage || 'https://images.unsplash.com/photo-1744196988043-78466f6ed98a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwyfHxpbmRpYW4lMjBqZXdlbGxlcnklMjBjcmFmdHNtYW4lMjB3b3JraW5nJTIwY2xvc2UlMjB1cHxlbnwwfHx8fDE3Njk2ODQ1Mzl8MA&ixlib=rb-4.1.0&q=85'}
              alt="About Komal Jewellery"
              fill
              className="object-cover shadow-xl"
            />
          </motion.div>
        </div>

        <div className="bg-secondary p-8 md:p-12">
          <h2 className="text-3xl font-semibold font-playfair text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-xl font-semibold mb-3 font-playfair">Quality Craftsmanship</h3>
              <p className="text-muted-foreground text-sm">
                Every piece is carefully selected and crafted to ensure durability and beauty that lasts.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-3 font-playfair">Affordable Luxury</h3>
              <p className="text-muted-foreground text-sm">
                Premium designs at prices that make luxury accessible to everyone.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-5xl mb-4">❤️</div>
              <h3 className="text-xl font-semibold mb-3 font-playfair">Customer First</h3>
              <p className="text-muted-foreground text-sm">
                Your satisfaction is our priority. We're here to help you find the perfect piece.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-semibold font-playfair text-center mb-8">Visit Our Store</h2>
          <div className="bg-white border border-border p-8 text-center">
            <p className="text-lg mb-2 font-semibold">Komal Imitation Jewellery</p>
            <p className="text-muted-foreground mb-1">Shubhansha Darga, Bohri Ali</p>
            <p className="text-muted-foreground mb-1">330, Borali, Rameshwar Chouk</p>
            <p className="text-muted-foreground mb-4">Raviwar Peth, Pune, Maharashtra 411002</p>
            <p className="text-sm text-muted-foreground">
              <strong>Hours:</strong> Open Daily, 9:00 AM - 9:00 PM
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
