import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Gif from '../../assets/Gif.svg';
import "./Wishlist.css";

function Wishlist() {
const [wishlistItems, setWishlistItems] = useState([]);
const [loading, setLoading] = useState(true);
const navigate = useNavigate();

const API_URL = "https://smartshop-api-oas7.onrender.com/wishlist";
const CART_URL = "https://smartshop-api-oas7.onrender.com/cart";

useEffect(() => {
axios.get(API_URL)
  .then((res) => {
    setWishlistItems(res.data || []);
    setLoading(false);
  })
  .catch(() => {
    toast.error("Error loading wishlist items");
    setLoading(false);
  });
}, []);

const handleRemoveFromWishlist = (e, id) => {
e.stopPropagation();
axios.delete(`${API_URL}/${id}`)
  .then(() => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
    toast.info("Removed from Wishlist", { autoClose: 1000, position: "top-center" });
  })
  .catch(() => toast.error("Failed to remove item"));
};

const handleAddToCart = (e, product) => {
e.stopPropagation();
const isLoggedIn = localStorage.getItem("login");

if (!isLoggedIn) {
  navigate("/login");
  return;
}

const cartProduct = { ...product };
if (cartProduct.productId) {
  cartProduct.id = cartProduct.productId;
}

axios.post(CART_URL, cartProduct)
  .then(() => {
    toast.success("Added to cart!", { autoClose: 1000, position: "top-center", theme: "dark" });
  })
  .catch(() => toast.error("Failed to add to cart"));
};

if (loading) {
return (
<div className="loading-container">
  <img src={Gif} alt="Loading" />
  <h2 className="loading-title">Loading Wishlist...</h2>
</div>
);
}

return (
<div className="wishlist-container">
  <div className="wishlist-header">
    <h1>Wishlist ({wishlistItems.length})</h1>
    <button className="bag-btn" onClick={() => navigate("/")}>Continue Shopping</button>
  </div>

  {wishlistItems.length === 0 ? (
    <div className="empty-wishlist">
      <i className="bi bi-heartbreak"></i>
      <h2>Your Wishlist is Empty</h2>
      <p>Explore our products and tap the heart to save your favorites!</p>
    </div>
  ) : (
    <div className="wishlist-grid">
      {wishlistItems.map((item) => {
        const targetId = item.productId || item.id;

        return (
          <article  
            className="shop-card"
            key={item.id}
            onClick={() => navigate(`/ProductDetails/${targetId}`)}
          >
            <div className="image-section">
              <span className="offer-tag">-35%</span>
              <div className="icon-overlay">
                <button className="circle-icon-btn remove-btn" onClick={(e) => handleRemoveFromWishlist(e, item.id)}>
                  <i className="bi bi-trash3-fill text-danger"></i>
                </button>
              </div>
              <img src={Array.isArray(item.image) ? item.image[0] : item.image}
                alt={item.name}
                className="item-image"
              />

              <button className="cart-hover-btn" onClick={(e) => handleAddToCart(e, item)}>
                <i className="bi bi-cart3"></i> Add To Cart
              </button>
            </div>

            <div className="details-section">
              <h3 className="item-name">{item.name}</h3>
              <div className="price-group">
                <span className="new-price">₹{item.price}</span>
                <span className="old-price">₹{item.price + 500}</span>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  )}
</div>
);
}

export default Wishlist;