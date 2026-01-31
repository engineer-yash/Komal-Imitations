import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import ImageUploadWidget from "../../components/ImageUploadWidget";

export default function AdminProducts() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterCategory, setFilterCategory] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const itemsPerPage = 10;
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    imageUrl: "",
    price: "",
    size: "",
    gender: "Unisex",
    description: "",
    featured: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const [productsRes, categoriesRes] = await Promise.all([
        axios.get("/api/products", config),
        axios.get("/api/categories", config),
      ]);
      setProducts(productsRes.data);
      setCategories(categoriesRes.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Error loading data. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (editingProduct) {
        await axios.put(
          "/api/products",
          { ...formData, id: editingProduct._id },
          config,
        );
      } else {
        await axios.post("/api/products", formData, config);
      }

      resetForm();
      fetchData();
    } catch (error) {
      alert("Error saving product");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/products?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (error) {
      alert("Error deleting product");
    }
  };

  const handleMultipleDelete = async () => {
    if (selectedProducts.length === 0) {
      alert("Please select products to delete");
      return;
    }
    if (!confirm(`Delete ${selectedProducts.length} selected products?`)) return;
    
    try {
      const token = localStorage.getItem("token");
      await Promise.all(
        selectedProducts.map((id) =>
          axios.delete(`/api/products?id=${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        )
      );
      setSelectedProducts([]);
      fetchData();
      alert("Products deleted successfully");
    } catch (error) {
      alert("Error deleting products");
    }
  };

  const toggleProductSelection = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const toggleAllProducts = () => {
    if (selectedProducts.length === paginatedProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(paginatedProducts.map((p) => p._id));
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      categoryId: product.categoryId._id || product.categoryId,
      imageUrl: product.imageUrl,
      price: product.price,
      size: product.size || "",
      gender: product.gender,
      description: product.description || "",
      featured: product.featured || false,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      categoryId: "",
      imageUrl: "",
      price: "",
      size: "",
      gender: "Unisex",
      description: "",
      featured: false,
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by category
    if (filterCategory) {
      filtered = filtered.filter(
        (p) => p.categoryId?._id === filterCategory
      );
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-high":
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "category":
        filtered.sort((a, b) =>
          (a.categoryId?.name || "").localeCompare(b.categoryId?.name || "")
        );
        break;
      case "newest":
      default:
        // Keep default order (already sorted by createdAt in API)
        break;
    }

    return filtered;
  }, [products, filterCategory, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedProducts, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterCategory, sortBy]);

  return (
    <div className="min-h-screen bg-secondary">
      <Head>
        <title>Manage Products - Admin</title>
      </Head>

      <nav className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => router.push("/admin/dashboard")}
              className="text-primary"
            >
              ← Dashboard
            </button>
            <h1 className="text-xl font-bold font-playfair">Products</h1>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold">
            All Products ({filteredAndSortedProducts.length})
          </h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary text-white px-6 py-2 rounded-full hover:bg-[#B5952F] w-full sm:w-auto"
            data-testid="add-product-button"
          >
            {showForm ? "Cancel" : "+ Add Product"}
          </button>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white p-4 mb-6 shadow-sm rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-border rounded-sm"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-border rounded-sm"
            >
              <option value="newest">Newest First</option>
              <option value="name">Name (A-Z)</option>
              <option value="category">Category</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            {selectedProducts.length > 0 && (
              <button
                onClick={handleMultipleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-sm hover:bg-red-700"
              >
                Delete Selected ({selectedProducts.length})
              </button>
            )}
          </div>
        </div>

        {showForm && (
          <div
            className="bg-white p-6 mb-6 shadow-sm"
            data-testid="product-form"
          >
            <h3 className="text-xl font-semibold mb-4">
              {editingProduct ? "Edit" : "Add"} Product
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Product Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="px-4 py-2 border border-border rounded-sm"
                />

                <select
                  value={formData.categoryId}
                  onChange={(e) =>
                    setFormData({ ...formData, categoryId: e.target.value })
                  }
                  required
                  className="px-4 py-2 border border-border rounded-sm"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  placeholder="Price (optional)"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="px-4 py-2 border border-border rounded-sm"
                />

                <input
                  type="text"
                  placeholder="Size (optional)"
                  value={formData.size}
                  onChange={(e) =>
                    setFormData({ ...formData, size: e.target.value })
                  }
                  className="px-4 py-2 border border-border rounded-sm"
                />

                <select
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                  className="px-4 py-2 border border-border rounded-sm md:col-span-2"
                >
                  <option value="Unisex">Unisex</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
              </div>

              <ImageUploadWidget
                label="Product Image"
                value={formData.imageUrl}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                required={true}
              />

              <textarea
                placeholder="Description (optional)"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-2 border border-border rounded-sm"
                rows="3"
              />
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData({ ...formData, featured: e.target.checked })
                  }
                />
                <span>Featured Product</span>
              </label>
              <button
                type="submit"
                className="bg-primary text-white px-8 py-2 rounded-full hover:bg-[#B5952F]"
              >
                {editingProduct ? "Update" : "Create"} Product
              </button>
            </form>
          </div>
        )}

        {loading ? (
          <div className="bg-white shadow-sm p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        ) : (
          <>
            <div className="bg-white shadow-sm overflow-x-auto" data-testid="products-list">
              <div className="min-w-[800px]">
                <table className="w-full divide-y divide-border">
                  <thead className="bg-secondary">
                    <tr>
                      <th className="px-4 py-3 text-left">
                        <input
                          type="checkbox"
                          checked={
                            paginatedProducts.length > 0 &&
                            selectedProducts.length === paginatedProducts.length
                          }
                          onChange={toggleAllProducts}
                          className="w-4 h-4 cursor-pointer"
                        />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                        Image
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {paginatedProducts.map((product) => (
                      <tr key={product._id}>
                        <td className="px-4 py-4">
                          <input
                            type="checkbox"
                            checked={selectedProducts.includes(product._id)}
                            onChange={() => toggleProductSelection(product._id)}
                            className="w-4 h-4 cursor-pointer"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-16 h-16 object-cover"
                          />
                        </td>
                        <td className="px-6 py-4">{product.name}</td>
                        <td className="px-6 py-4">
                          {product.categoryId?.name || "N/A"}
                        </td>
                        <td className="px-6 py-4">₹{product.price}</td>
                        <td className="px-6 py-4 space-x-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="text-primary hover:underline"
                            data-testid={`edit-product-${product._id}`}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="text-red-600 hover:underline"
                            data-testid={`delete-product-${product._id}`}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white shadow-sm p-4 mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-sm text-gray-600">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(currentPage * itemsPerPage, filteredAndSortedProducts.length)} of{" "}
                  {filteredAndSortedProducts.length} products
                </div>
                <div className="flex gap-2 flex-wrap justify-center">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-border rounded-sm hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-4 py-2 border rounded-sm ${
                        currentPage === i + 1
                          ? "bg-primary text-white border-primary"
                          : "border-border hover:bg-secondary"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-border rounded-sm hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
