import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const Shop = () => {
  const { addToCart } = useCart();
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('default');
  const [search, setSearch] = useState('');

  // Filtering Logic
  let filteredProducts = products.filter(product => 
    (filter === 'All' || product.category === filter) &&
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // Sorting Logic
  if (sort === 'low-high') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === 'high-low') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="container section">
      <div className="shop-header">
        <h1>Shop All Products</h1>
        <div className="filters">
          <input 
            type="text" 
            placeholder="Search products..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <select onChange={(e) => setFilter(e.target.value)} className="filter-select">
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home">Home</option>
          </select>
          <select onChange={(e) => setSort(e.target.value)} className="filter-select">
            <option value="default">Sort By</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="product-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <div className="img-container">
               <img src={product.image} alt={product.name} />
            </div>
            <div className="card-body">
              <h3>{product.name}</h3>
              <div className="rating">
                <i className="fas fa-star"></i> {product.rating}
              </div>
              <p className="price">${product.price}</p>
              <button onClick={() => addToCart(product)} className="btn btn-primary full-width">
                Add to Cart
              </button>
              <Link to={`/product/${product.id}`} className="link-details">View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
