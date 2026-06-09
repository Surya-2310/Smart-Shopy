import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "./Api.css";

function Api({ products }) {
  const sliderRef = useRef(null);
  const navigate = useNavigate();
  const [dbWishlist, setDbWishlist] = useState([]);

  const WISHLIST_URL = "https://smartshop-api-oas7.onrender.com/wishlist";

  useEffect(() => {
    axios
      .get(WISHLIST_URL)
      .then((res) => {
        setDbWishlist(res.data || []);
      })
      .catch((err) => console.error("Error fetching wishlist:", err));
  }, []);

  const moveSlider = (direction) => {
    if (sliderRef.current) {
      const { scrollLeft} = sliderRef.current;
      const moveAmount = direction === "prev" ? scrollLeft - 600 : scrollLeft + 600;
      sliderRef.current.scrollTo({
        left: moveAmount,
        behavior: "smooth",
      });
    }
  };

  const handleProductClick = (id) => {
    navigate(`/ProductDetails/${id}`);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    const isLoggedIn = localStorage.getItem("login");

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    axios
      .post("https://smartshop-api-oas7.onrender.com/cart", product)
      .then(() => {
        toast.success("Added to cart", {
          autoClose: 1000,
          position: "top-center",
          theme: "dark",
        });
      })
      .catch((err) => toast.error(err));
  };

  const handleHeartClick = (e, item) => {
    e.stopPropagation();
    const isAlreadySaved = dbWishlist.some((wishItem) => wishItem.id === item.id);

    if (isAlreadySaved) {
      axios
        .delete(`${WISHLIST_URL}/${item.id}`)
        .then(() => {
          setDbWishlist((prev) => prev.filter((wishItem) => wishItem.id !== item.id));
          toast.info("Removed from Wishlist", { autoClose: 1000, position: "top-center" });
        })
        .catch(() => toast.error("Failed to remove from wishlist"));
    } else {
      axios
        .post(WISHLIST_URL, item)
        .then(() => {
          setDbWishlist((prev) => [...prev, item]);
          toast.success("Added to Wishlist!", { autoClose: 1000, position: "top-center", theme: "dark" });
        })
        .catch(() => toast.error("Failed to add to wishlist"));
    }
  };

  return (
    <div className="shop-wrapper">
      <ToastContainer />
      <div className="section-header">
        <div className="arrow-group">
          <button className="slide-btn" onClick={() => moveSlider("prev")}>
            <i className="bi bi-arrow-left"></i>
          </button>
          <button className="slide-btn" onClick={() => moveSlider("next")}>
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>

      <div className="slider-container" ref={sliderRef}>
        <div className="card-row">
          {!products ? (
            <h2 className="loading-title">Loading Products...</h2>
          ) : products.length === 0 ? (
            <h3 className="no-products-title" style={{ padding: "20px", color: "#555" }}>
              No products found matching your search.
            </h3>
          ) : (
            products.map((item) => {
              const isLiked = dbWishlist.some((wishItem) => wishItem.id === item.id);
              return (
                <article 
                  className="shop-card" 
                  key={item.id} 
                  onClick={() => handleProductClick(item.id)}
                >
                  <div className="image-section">
                    <span className="offer-tag">-35%</span>
                    <div className="icon-overlay">
                      <button className="circle-icon-btn" onClick={(e) => handleHeartClick(e, item)}>
                        <i 
                          className={`bi ${isLiked ? "bi-heart-fill" : "bi-heart"}`}
                          style={{ color: isLiked ? "#db4444" : "inherit" }}
                        ></i>
                      </button>
                    </div>
                        
                    <img 
                      src={Array.isArray(item.image) ? item.image[0] : item.image} 
                      alt={item.name} 
                      className="item-image" 
                    />
                        
                    <button
                      className="cart-hover-btn"
                      onClick={(e) => handleAddToCart(e, item)}
                    >
                      <i className="bi bi-cart3" style={{ marginRight: "8px" }}></i> Add To Cart
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
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Api;