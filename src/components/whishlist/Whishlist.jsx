import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./Whishlist.css";
import Api from '../ProductApI/Api.jsx';

function Whishlist() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const items = location.state?.allProducts || [];

  const addCart = () => {
    toast.success(" added to cart", {
      autoClose: 1000,
      position: "top-center",
    });
  };

  function handlemove() {
    navigate("/");
  }

  function handleclicks(id) { 
    navigate(`/ProductDetails/${id}`);
  }



  return (
    <div className="shop-wrapper">
      <ToastContainer />
      
      <div className="wishlist-header">
        <h2 className="wishlist-count">Wishlist ({items.length})</h2>
        <button className="move-all-btn" onClick={() => handlemove()}>Move All To Bag</button>
      </div>

      <div className="wishlist-grid">
        {items.map((item) => (
          <article 
            className="shop-card" 
            key={item.id} 
            onClick={() => handleclicks(item.id)}
          >
            <div className="image-section">
              <span className="offer-tag">-35%</span>
              <div className="icon-overlay">
                <button className="circle-btn" onClick={(e) => e.stopPropagation()}>
                  <i className="bi bi-trash"></i>
                </button>
              </div>
             
                <img src={Array.isArray(item.image) ? item.image[0] : item.image} alt={item.name} className="item-image" 
/>
              
              <button 
                className="cart-hover-btn" 
                onClick={(e) => {
                  e.stopPropagation();
                  addCart(item);
                }}
              >
                <i className="bi bi-cart3"></i> Add To Cart
              </button>
            </div>

            <div className="details-section">
              <h3 className="item-name">{item.name}</h3>
              <div className="price-group">
                <span className="new-price">₹{item.price}</span>
                <span className="old-price">₹{item.price + 500}</span>
              </div>
              <div className="rating-row">
                <div className="stars">
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill dull-star"></i>
                </div>
                <span className="review-count">(88)</span>
              </div>
            </div>
          </article>
        ))}
      </div>
      
      <Api products={items} />
    </div>
  );
}

export default Whishlist;