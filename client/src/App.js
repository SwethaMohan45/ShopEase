import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const DEFAULT_API_KEY = 'test-api-key-12345';

function App() {
  const [apiKey, setApiKey] = useState(localStorage.getItem('apiKey') || DEFAULT_API_KEY);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState({ text: '', type: '' });
  
  // Category form state
  const [categoryForm, setCategoryForm] = useState({ name: '', description: '' });
  
  // Product form state
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    categoryId: '',
    inStock: true
  });
  
  // Filter state
  const [filter, setFilter] = useState({ categoryId: '', inStock: '' });

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  const handleApiKeyChange = (e) => {
    const key = e.target.value;
    setApiKey(key);
    localStorage.setItem('apiKey', key);
  };

  // Category operations
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories`);
      setCategories(response.data.data);
    } catch (error) {
      showMessage('Failed to fetch categories', 'error');
    }
  };

  const createCategory = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${API_BASE_URL}/categories`,
        categoryForm,
        { headers: { 'x-api-key': apiKey } }
      );
      showMessage('Category created successfully!');
      setCategoryForm({ name: '', description: '' });
      fetchCategories();
    } catch (error) {
      showMessage(error.response?.data?.message || 'Failed to create category', 'error');
    }
  };

  const deleteCategory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    
    try {
      await axios.delete(`${API_BASE_URL}/categories/${id}`, {
        headers: { 'x-api-key': apiKey }
      });
      showMessage('Category deleted successfully!');
      fetchCategories();
      fetchProducts();
    } catch (error) {
      showMessage(error.response?.data?.message || 'Failed to delete category', 'error');
    }
  };

  // Product operations
  const fetchProducts = async () => {
    try {
      let url = `${API_BASE_URL}/products`;
      const params = new URLSearchParams();
      if (filter.categoryId) params.append('categoryId', filter.categoryId);
      if (filter.inStock !== '') params.append('inStock', filter.inStock);
      if (params.toString()) url += `?${params.toString()}`;
      
      const response = await axios.get(url);
      setProducts(response.data.data);
    } catch (error) {
      showMessage('Failed to fetch products', 'error');
    }
  };

  const createProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${API_BASE_URL}/products`,
        { ...productForm, price: parseFloat(productForm.price) },
        { headers: { 'x-api-key': apiKey } }
      );
      showMessage('Product created successfully!');
      setProductForm({ name: '', price: '', categoryId: '', inStock: true });
      fetchProducts();
    } catch (error) {
      showMessage(error.response?.data?.message || 'Failed to create product', 'error');
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await axios.delete(`${API_BASE_URL}/products/${id}`, {
        headers: { 'x-api-key': apiKey }
      });
      showMessage('Product deleted successfully!');
      fetchProducts();
    } catch (error) {
      showMessage(error.response?.data?.message || 'Failed to delete product', 'error');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filter]);

  return (
    <div className="App">
      <header className="header">
        <h1>Product & Category Management</h1>
        <p>REST API Test Interface</p>
      </header>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="api-key-section">
        <label htmlFor="apiKey">API Key (for write operations):</label>
        <input
          id="apiKey"
          type="text"
          value={apiKey}
          onChange={handleApiKeyChange}
          placeholder="test-api-key-12345"
          className="api-key-input"
        />
        <small style={{display: 'block', marginTop: '5px', color: '#666'}}>
          Default: test-api-key-12345 (already loaded)
        </small>
      </div>

      <div className="container">
        <div className="section">
          <h2>Categories</h2>
          
          <form onSubmit={createCategory} className="form">
            <h3>Create Category</h3>
            <input
              type="text"
              placeholder="Category Name *"
              value={categoryForm.name}
              onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
              required
            />
            <textarea
              placeholder="Description (optional)"
              value={categoryForm.description}
              onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
              rows="3"
            />
            <button type="submit" className="btn btn-primary">Create Category</button>
          </form>

          <div className="list">
            <h3>All Categories ({categories.length})</h3>
            {categories.length === 0 ? (
              <p className="empty-state">No categories yet. Create one above!</p>
            ) : (
              categories.map((category) => (
                <div key={category._id} className="card">
                  <div className="card-content">
                    <h4>{category.name}</h4>
                    {category.description && <p>{category.description}</p>}
                    <small>ID: {category._id}</small>
                  </div>
                  <button
                    onClick={() => deleteCategory(category._id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="section">
          <h2>Products</h2>
          
          <form onSubmit={createProduct} className="form">
            <h3>Create Product</h3>
            <input
              type="text"
              placeholder="Product Name *"
              value={productForm.name}
              onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
              required
            />
            <input
              type="number"
              step="0.01"
              placeholder="Price *"
              value={productForm.price}
              onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
              required
            />
            <select
              value={productForm.categoryId}
              onChange={(e) => setProductForm({ ...productForm, categoryId: e.target.value })}
              required
            >
              <option value="">Select Category *</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={productForm.inStock}
                onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
              />
              In Stock
            </label>
            <button type="submit" className="btn btn-primary">Create Product</button>
          </form>

          <div className="filters">
            <h3>Filter Products</h3>
            <div className="filter-group">
              <select
                value={filter.categoryId}
                onChange={(e) => setFilter({ ...filter, categoryId: e.target.value })}
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <select
                value={filter.inStock}
                onChange={(e) => setFilter({ ...filter, inStock: e.target.value })}
              >
                <option value="">All Stock Status</option>
                <option value="true">In Stock</option>
                <option value="false">Out of Stock</option>
              </select>
              <button
                onClick={() => setFilter({ categoryId: '', inStock: '' })}
                className="btn btn-secondary btn-sm"
              >
                Clear Filters
              </button>
            </div>
          </div>

          <div className="list">
            <h3>All Products ({products.length})</h3>
            {products.length === 0 ? (
              <p className="empty-state">No products yet. Create one above!</p>
            ) : (
              products.map((product) => (
                <div key={product._id} className="card product-card">
                  <div className="card-content">
                    <h4>{product.name}</h4>
                    <p className="price">${parseFloat(product.price).toFixed(2)}</p>
                    <p className="category">
                      Category: {product.categoryId?.name || 'N/A'}
                    </p>
                    <span className={`badge ${product.inStock ? 'badge-success' : 'badge-danger'}`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                    <small>ID: {product._id}</small>
                  </div>
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <footer className="footer">
        <p>Built with React and Express</p>
      </footer>
    </div>
  );
}

export default App;

