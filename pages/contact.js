import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import axios from 'axios';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await axios.post('/api/contact', formData);
      setStatus({ type: 'success', message: 'Thank you! We will get back to you soon.' });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Contact Us - Komal Imitation Jewellery</title>
        <meta name="description" content="Get in touch with Komal Imitation Jewellery" />
      </Head>

      <div className="bg-secondary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold font-playfair text-center">Contact Us</h1>
          <p className="text-center text-muted-foreground mt-4">We'd love to hear from you</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold font-playfair mb-6">Get in Touch</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
              <div>
                <label className="block text-sm font-semibold mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-secondary border border-transparent focus:border-primary focus:ring-2 focus:ring-primary rounded-sm px-4 py-3 outline-none transition"
                  data-testid="contact-name-input"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-secondary border border-transparent focus:border-primary focus:ring-2 focus:ring-primary rounded-sm px-4 py-3 outline-none transition"
                  data-testid="contact-email-input"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-secondary border border-transparent focus:border-primary focus:ring-2 focus:ring-primary rounded-sm px-4 py-3 outline-none transition"
                  data-testid="contact-phone-input"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full bg-secondary border border-transparent focus:border-primary focus:ring-2 focus:ring-primary rounded-sm px-4 py-3 outline-none transition"
                  data-testid="contact-message-input"
                ></textarea>
              </div>

              {status.message && (
                <div
                  className={`p-4 rounded-sm ${
                    status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                  }`}
                  data-testid="contact-form-status"
                >
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white hover:bg-[#B5952F] rounded-full px-8 py-3 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50"
                data-testid="contact-submit-button"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-semibold font-playfair mb-4">Visit Us</h3>
              <div className="bg-secondary p-6">
                <p className="font-semibold mb-2">Komal Imitation Jewellery</p>
                <p className="text-sm text-muted-foreground mb-1">Shubhansha Darga, Bohri Ali</p>
                <p className="text-sm text-muted-foreground mb-1">330, Borali, Rameshwar Chouk</p>
                <p className="text-sm text-muted-foreground">Raviwar Peth, Pune, Maharashtra 411002</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold font-playfair mb-4">Contact Details</h3>
              <div className="bg-secondary p-6 space-y-3">
                <div>
                  <p className="text-sm font-semibold mb-1">Phone</p>
                  <a href={`tel:${whatsappNumber}`} className="text-primary hover:underline">
                    {whatsappNumber}
                  </a>
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1">Hours</p>
                  <p className="text-sm text-muted-foreground">Open Daily: 9:00 AM - 9:00 PM</p>
                </div>
              </div>
            </div>

            <div>
              <a
                href={`https://wa.me/${whatsappNumber?.replace(/\+/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#25D366] text-white text-center hover:bg-[#1fa855] rounded-full px-8 py-4 transition-all duration-300 shadow-md hover:shadow-lg font-semibold"
                data-testid="whatsapp-contact-button"
              >
                💬 Message us on WhatsApp
              </a>
            </div>

            <div className="h-64 bg-secondary">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.5448446732856!2d73.8569198!3d18.5131223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c0689a53bc33%3A0x520e8b876d07ee95!2sKOMAL%20IMITATION%20JEWELLERY!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                data-testid="google-maps-embed"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
