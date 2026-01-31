import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    gender: '',
    minPrice: '',
    maxPrice: '',
  });
  const router = useRouter();

  // Fetch categories on every mount to ensure fresh data
  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle category from URL query on mount and when query changes
  useEffect(() => {
    const { category } = router.query;
    if (category && category !== filters.category) {
      setFilters(prev => ({ ...prev, category }));
    } else if (!category && filters.category) {
      // Reset category filter if no category in URL
      setFilters(prev => ({ ...prev, category: '' }));
    }
  }, [router.query]);

  // Fetch products whenever filters change or on mount
  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/categories');
      setCategories(res.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.gender) params.append('gender', filters.gender);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      
      const res = await axios.get(`/api/products?${params.toString()}`);
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      gender: '',
      minPrice: '',
      maxPrice: '',
    });
  };

  return (
    <Layout>
      <Head>
        <title>Products - Komal Imitation Jewellery</title>
        <meta name="description" content="Browse our collection of premium imitation jewellery" />
      </Head>

      <div className="bg-secondary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold font-playfair text-center">Our Collection</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-secondary p-6 sticky top-20" data-testid="filters-panel">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold font-playfair">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary hover:underline"
                  data-testid="clear-filters-button"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full bg-white border border-border rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    data-testid="category-filter"
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Gender</label>
                  <select
                    value={filters.gender}
                    onChange={(e) => handleFilterChange('gender', e.target.value)}
                    className="w-full bg-white border border-border rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    data-testid="gender-filter"
                  >
                    <option value="">All</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Unisex">Unisex</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Price Range</label>
                  <div className="space-y-2">
                    <input
                      type="number"
                      placeholder="Min Price"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      className="w-full bg-white border border-border rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      data-testid="min-price-filter"
                    />
                    <input
                      type="number"
                      placeholder="Max Price"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      className="w-full bg-white border border-border rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      data-testid="max-price-filter"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
                <p className="mt-4 text-gray-600">Loading products...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12" data-testid="no-products-message">
                <p className="text-muted-foreground">No products found matching your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6" data-testid="products-grid">
                {products.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-white overflow-hidden transition-all duration-300 hover:shadow-xl"
                    data-testid={`product-card-${index}`}
                  >
                    <div className="relative h-64 md:h-72 overflow-hidden">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-1 text-sm md:text-base">{product.name}</h3>
                      {product.categoryId?.name && (
                        <p className="text-xs text-muted-foreground mb-2">{product.categoryId.name}</p>
                      )}
                      {product.description && (
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                      )}
                      <div className="flex justify-between items-center mt-2">
                        {product.price ? (
                          <p className="text-primary font-bold">₹{product.price.toLocaleString()}</p>
                        ) : (
                          <p className="text-primary font-semibold text-sm">Visit Shop For Price</p>
                        )}
                        {product.gender && (
                          <span className="text-xs text-muted-foreground">{product.gender}</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
