import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cartTotal, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    clearCart(); // Clear cart after order
  };

  if (submitted) {
    return (
      <div className="container section text-center">
        <i className="fas fa-check-circle" style={{fontSize: '4rem', color: 'green'}}></i>
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for your purchase.</p>
      </div>
    );
  }

  return (
    <div className="container section">
      <h1>Checkout</h1>
      <div className="checkout-grid">
        <form onSubmit={handleSubmit} className="billing-form">
          <h3>Billing Details</h3>
          <div className="form-group">
            <input type="text" placeholder="Full Name" required />
          </div>
          <div className="form-group">
            <input type="email" placeholder="Email Address" required />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Address" required />
          </div>
          <div className="row">
            <input type="text" placeholder="City" required />
            <input type="text" placeholder="ZIP Code" required />
          </div>
          <h3>Payment</h3>
          <div className="payment-options">
            <label><input type="radio" name="payment" defaultChecked /> Credit Card</label>
            <label><input type="radio" name="payment" /> Cash on Delivery</label>
          </div>
          <button type="submit" className="btn btn-primary full-width">Place Order (${cartTotal})</button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
