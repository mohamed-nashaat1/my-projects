import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) return <div className="container">Product not found</div>;

  return (
    <div className="container section product-details">
      <div className="details-grid">
        <div className="details-img">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="details-info">
          <h1>{product.name}</h1>
          <p className="category">Category: {product.category}</p>
          <h2 className="price">${product.price}</h2>
          <p className="desc">{product.description}</p>
          
          <div className="actions">
            <div className="qty-selector">
              <button onClick={() => setQty(q => Math.max(1, q - 1))}>-</button>
              <span>{qty}</span>
              <button onClick={() => setQty(q => q + 1)}>+</button>
            </div>
            <button 
              onClick={() => addToCart(product, qty)} 
              className="btn btn-primary"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
