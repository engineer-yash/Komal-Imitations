import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import axios from 'axios';

export default function Catalog() {
  const [catalogs, setCatalogs] = useState([]);

  useEffect(() => {
    fetchCatalogs();
  }, []);

  const fetchCatalogs = async () => {
    try {
      const res = await axios.get('/api/catalogs');
      setCatalogs(res.data);
    } catch (error) {
      console.error('Error fetching catalogs:', error);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Catalog - Komal Imitation Jewellery</title>
        <meta name="description" content="Download our product catalogs" />
      </Head>

      <div className="bg-secondary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold font-playfair text-center">Our Catalogs</h1>
          <p className="text-center text-muted-foreground mt-4">Browse and download our latest collections</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {catalogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No catalogs available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-testid="catalogs-grid">
            {catalogs.map((catalog, index) => (
              <motion.div
                key={catalog._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border border-border overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                data-testid={`catalog-card-${index}`}
              >
                {catalog.thumbnailUrl && (
                  <div className="relative h-64">
                    <Image
                      src={catalog.thumbnailUrl}
                      alt={catalog.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold font-playfair mb-2">{catalog.title}</h3>
                  {catalog.description && (
                    <p className="text-muted-foreground text-sm mb-4">{catalog.description}</p>
                  )}
                  <a
                    href={catalog.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-primary text-white hover:bg-[#B5952F] rounded-full px-6 py-2 text-sm transition-all duration-300"
                    data-testid={`download-catalog-${index}`}
                  >
                    View Catalog
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
