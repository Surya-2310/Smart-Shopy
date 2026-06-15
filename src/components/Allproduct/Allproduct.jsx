import  { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./Allproduct.css";
import Api from '../ProductApI/Api.jsx';

function Allproduct() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const items = location.state?.allProducts || [];

  const [dbWishlist, setDbWishlist] = useState([]);

  const WISHLIST_URL = "https://smartshop-api-oas7.onrender.com/wishlist";

  useEffect(() => {
    axios.get(WISHLIST_URL)
      .then((res) => {
        setDbWishlist(res.data || []);
      })
      .catch((err) => toast.error("Error fetching wishlist:", err));
  }, []);

  const addCart = (product) => {
    const isLoggedIn = localStorage.getItem("login");

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    axios.post("https://smartshop-api-oas7.onrender.com/cart", product)
      .then(() => {
        toast.success("Added to cart", {
          autoClose: 1000,
          position: "top-center",
        });
      })
      .catch(() => toast.error("Failed to add to cart"));
  };

  const handleHeartClick = (e, item) => {
    e.stopPropagation();
    const isAlreadySaved = dbWishlist.some((wishItem) => wishItem.id === item.id);

    if (isAlreadySaved) {
      axios.delete(`${WISHLIST_URL}/${item.id}`)
        .then(() => {
          setDbWishlist((prev) => prev.filter((wishItem) => wishItem.id !== item.id));
          toast.info("Removed from Wishlist", {
            autoClose: 1000,
            position: "top-center",
          });
        })
        .catch(() => toast.error("Failed to remove from wishlist"));
    } else {
      axios.post(WISHLIST_URL, item)
        .then(() => {
          setDbWishlist((prev) => [...prev, item]);
          toast.success("Added to Wishlist", {
            autoClose: 1000,

          });
        })
        .catch(() => toast.error("Failed to add to wishlist"));
    }
  };

  function handlemove() {
    navigate("/");
  }

  function handleclicks(id) { 
    navigate(`/ProductDetails/${id}`);
  }

  return (
    <div className="shop-wrapper">
      
      <div className="wishlist-header">
        <h2 className="wishlist-count">All Products ({items.length})</h2>
        <button className="move-all-btn" onClick={handlemove}>Move All To Bag</button>
      </div>

      <div className="wishlist-grid">
        {items.map((item) => {
          const isLiked = dbWishlist.some((wishItem) => wishItem.id === item.id);
          const heartClass = isLiked ? "bi-heart-fill dynamic-heart-liked" : "bi-heart dynamic-heart-unliked";

          return (
            <article className="shop-card" key={item.id} onClick={() => handleclicks(item.id)} >

              <div className="image-section">
                <span className="offer-tag">-35%</span>
                <div className="icon-overlay">
                  <button className="circle-btn" onClick={(e) => handleHeartClick(e, item)}>
                    <i className={`bi ${heartClass}`}></i>
                  </button>
                </div>
               
                <img src={Array.isArray(item.image) ? item.image[0] : item.image} alt={item.name} className="item-image" />
                
                <button className="cart-hover-btn" onClick={(e) => {
                    e.stopPropagation();
                    addCart(item);
                  }}>
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
          );
        })}
      </div>
    
      <Api products={items} />
    </div>
  );
}

export default Allproduct;