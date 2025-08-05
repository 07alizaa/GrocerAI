import React, { useState } from 'react';
import { Package, Search, Plus, Edit3, Trash2, DollarSign, Image, Eye, Grid, List } from 'lucide-react';
import AdminProductCard from '../../components/AdminProductCard';
import { useAdminProducts } from '../../hooks/useAdmin';
import { useCategories } from '../../hooks/useProducts';

const AdminProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  
  // Use our custom hooks
  const { 
    products, 
    pagination, 
    loading, 
    error, 
    createProduct, 
    updateProduct, 
    deleteProduct 
  } = useAdminProducts(currentPage, 10, searchTerm);
  
  const { categories } = useCategories();
  
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    discounted_price: '',
    sku: '',
    category_id: '',
    brand: '',
    unit: 'piece',
    stock_quantity: '',
    min_stock_level: '5',
    max_order_quantity: '10',
    image_urls: [''], // Array of image URLs
    tags: '',
    is_active: true,
    is_featured: false,
    weight: ''
  });

  // Handle pagination
  const totalPages = pagination?.totalPages || 1;

  // Show error message if there's an API error
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#ECFAE5] to-white flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Error loading products: {error}
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-[#B0DB9C] text-[#0A400C] px-6 py-3 rounded-xl font-semibold hover:bg-white transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = {
        name: productForm.name.trim(),
        description: productForm.description.trim(),
        price: parseFloat(productForm.price),
        discounted_price: productForm.discounted_price ? parseFloat(productForm.discounted_price) : null,
        sku: productForm.sku.trim(),
        category_id: parseInt(productForm.category_id),
        brand: productForm.brand.trim(),
        unit: productForm.unit,
        stock_quantity: parseInt(productForm.stock_quantity),
        min_stock_level: parseInt(productForm.min_stock_level),
        max_order_quantity: parseInt(productForm.max_order_quantity),
        image_urls: productForm.image_urls.filter(url => url.trim() !== ''),
        tags: productForm.tags ? productForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '') : [],
        is_active: productForm.is_active,
        is_featured: productForm.is_featured,
        weight: productForm.weight ? parseFloat(productForm.weight) : null
      };

      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
      } else {
        await createProduct(productData);
      }

      // Reset form and close modal
      setProductForm({
        name: '',
        description: '',
        price: '',
        discounted_price: '',
        sku: '',
        category_id: '',
        brand: '',
        unit: 'piece',
        stock_quantity: '',
        min_stock_level: '5',
        max_order_quantity: '10',
        image_urls: [''],
        tags: '',
        is_active: true,
        is_featured: false,
        weight: ''
      });
      setShowModal(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const resetForm = () => {
    setProductForm({
      name: '',
      description: '',
      price: '',
      discounted_price: '',
      sku: '',
      category_id: '',
      brand: '',
      unit: 'piece',
      stock_quantity: '',
      min_stock_level: '5',
      max_order_quantity: '10',
      image_urls: [''],
      tags: '',
      is_active: true,
      is_featured: false,
      weight: ''
    });
    setEditingProduct(null);
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await deleteProduct(productId);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUrlChange = (index, value) => {
    const newImageUrls = [...productForm.image_urls];
    newImageUrls[index] = value;
    setProductForm(prev => ({
      ...prev,
      image_urls: newImageUrls
    }));
  };

  const addImageUrl = () => {
    setProductForm(prev => ({
      ...prev,
      image_urls: [...prev.image_urls, '']
    }));
  };

  const removeImageUrl = (index) => {
    if (productForm.image_urls.length > 1) {
      const newImageUrls = productForm.image_urls.filter((_, i) => i !== index);
      setProductForm(prev => ({
        ...prev,
        image_urls: newImageUrls
      }));
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name || '',
      description: product.description || '',
      price: product.price?.toString() || '',
      discounted_price: product.discounted_price?.toString() || '',
      sku: product.sku || '',
      category_id: product.category_id?.toString() || '',
      brand: product.brand || '',
      unit: product.unit || '',
      stock_quantity: product.stock_quantity?.toString() || '',
      min_stock_level: product.min_stock_level?.toString() || '',
      max_order_quantity: product.max_order_quantity?.toString() || '',
      image_urls: product.image_urls || [''],
      tags: Array.isArray(product.tags) ? product.tags.join(', ') : (product.tags || ''),
      is_active: product.is_active || false,
      is_featured: product.is_featured || false,
      weight: product.weight?.toString() || ''
    });
    setShowModal(true);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.category_name && product.category_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#ECFAE5] to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#B0DB9C] mx-auto mb-4"></div>
          <p className="text-[#0A400C] font-semibold">Loading Products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ECFAE5] to-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#0A400C] to-[#2D5A2F] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-[#B0DB9C] p-3 rounded-full">
                <Package className="h-8 w-8 text-[#0A400C]" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Product Management</h1>
                <p className="text-[#B0DB9C]">Manage your product catalog and inventory</p>
              </div>
            </div>
            
            <button 
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              className="bg-[#B0DB9C] text-[#0A400C] px-6 py-3 rounded-xl font-semibold hover:bg-white transition-colors flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Add Product</span>
            </button>
          </div>
        </div>
      </section>

      {/* Search and View Controls */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#B0DB9C]/20 mb-8">
            <div className="flex justify-between items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B0DB9C] focus:border-transparent"
                />
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid' 
                        ? 'bg-[#B0DB9C] text-[#0A400C]' 
                        : 'text-gray-600 hover:text-[#0A400C]'
                    }`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'table' 
                        ? 'bg-[#B0DB9C] text-[#0A400C]' 
                        : 'text-gray-600 hover:text-[#0A400C]'
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{filteredProducts.length}</span> products found
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Display */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {viewMode === 'grid' ? (
            /* Grid View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <AdminProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEdit}
                  onDelete={handleDeleteProduct}
                  onView={(product) => console.log('View product:', product)}
                />
              ))}
            </div>
          ) : (
            /* Table View */
            <div className="bg-white rounded-2xl shadow-lg border-2 border-[#B0DB9C]/20 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#ECFAE5]">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[#0A400C]">Product</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[#0A400C]">Category</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[#0A400C]">Price</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[#0A400C]">Stock</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[#0A400C]">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[#0A400C]">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="group hover:bg-[#ECFAE5]/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="bg-[#B0DB9C] p-2 rounded-full">
                              <Package className="h-5 w-5 text-[#0A400C]" />
                            </div>
                            <div>
                              <p className="font-semibold text-[#0A400C]">{product.name}</p>
                              <p className="text-sm text-gray-500">{product.unit}</p>
                              {product.is_featured && (
                                <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full mt-1">
                                  Featured
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{product.category_name || 'No Category'}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-4 w-4 text-gray-400" />
                            <span className="font-semibold text-[#0A400C]">₹{product.price}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            product.stock_quantity > 10 
                              ? 'bg-green-100 text-green-800'
                              : product.stock_quantity > 0
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {product.stock_quantity} {product.unit}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            product.is_active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {product.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleEdit(product)}
                              className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                              title="Edit product"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors"
                              title="Delete product"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 bg-white rounded-2xl shadow-lg border-2 border-[#B0DB9C]/20 overflow-hidden">
              <div className="bg-[#ECFAE5] px-6 py-4 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-[#B0DB9C] hover:text-[#0A400C] transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-[#B0DB9C] hover:text-[#0A400C] transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Add Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-[#0A400C] mb-6">Add New Product</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={productForm.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B0DB9C]"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <select
                  name="category_id"
                  value={productForm.category_id}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B0DB9C]"
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
                <input
                  type="number"
                  name="price"
                  step="0.01"
                  value={productForm.price}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B0DB9C]"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unit *</label>
                <select
                  name="unit"
                  value={productForm.unit}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B0DB9C]"
                >
                  <option value="">Select unit</option>
                  <option value="kg">Kg</option>
                  <option value="grams">Grams</option>
                  <option value="liters">Liters</option>
                  <option value="ml">ML</option>
                  <option value="pieces">Pieces</option>
                  <option value="packets">Packets</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity *</label>
                <input
                  type="number"
                  name="stock_quantity"
                  value={productForm.stock_quantity}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B0DB9C]"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={productForm.brand}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B0DB9C]"
                  placeholder="Enter brand name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SKU</label>
                <input
                  type="text"
                  name="sku"
                  value={productForm.sku}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B0DB9C]"
                  placeholder="Product SKU"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sale Price</label>
                <input
                  type="number"
                  name="discounted_price"
                  step="0.01"
                  value={productForm.discounted_price}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B0DB9C]"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight (optional)</label>
                <input
                  type="number"
                  name="weight"
                  step="0.001"
                  value={productForm.weight}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B0DB9C]"
                  placeholder="0.000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Stock Level</label>
                <input
                  type="number"
                  name="min_stock_level"
                  value={productForm.min_stock_level}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B0DB9C]"
                  placeholder="5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Order Quantity</label>
                <input
                  type="number"
                  name="max_order_quantity"
                  value={productForm.max_order_quantity}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B0DB9C]"
                  placeholder="10"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
              <input
                type="text"
                name="tags"
                value={productForm.tags}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B0DB9C]"
                placeholder="organic, fresh, local"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={productForm.description}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B0DB9C]"
                rows="3"
                placeholder="Product description"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URLs</label>
                <div className="flex flex-col space-y-2">
                  {productForm.image_urls.map((url, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={url}
                        onChange={(e) => handleImageUrlChange(index, e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B0DB9C]"
                        placeholder="Enter image URL"
                      />
                      <button
                        onClick={() => removeImageUrl(index)}
                        className="text-red-600 hover:text-red-800"
                        type="button"
                        title="Remove image URL"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={addImageUrl}
                    className="text-[#0A400C] bg-[#B0DB9C] hover:bg-[#9BC986] rounded-lg px-4 py-2 font-semibold transition-colors"
                    type="button"
                  >
                    <Plus className="h-5 w-5 inline-block mr-1" />
                    Add Another Image URL
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6 mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="active"
                  name="is_active"
                  checked={productForm.is_active}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="active" className="text-sm font-medium text-gray-700">
                  Active Product
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  name="is_featured"
                  checked={productForm.is_featured}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                  Featured Product
                </label>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-[#B0DB9C] text-[#0A400C] rounded-lg font-semibold hover:bg-[#9BC986] transition-colors disabled:opacity-50"
                >
                  {loading ? 'Saving...' : editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
