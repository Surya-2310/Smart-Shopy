import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import frame1 from "../../assets/frame1.png";
import frame2 from "../../assets/frame2.png";
import frame3 from "../../assets/frame3.png";
import frame4 from "../../assets/frame4.png";

import apple from "../../assets/apple.png";
import LG from '../../assets/LG.png';
import phone from "../../assets/phone img.png";

import camera from "../../assets/Category-Camera.png";
import cellphone from "../../assets/Category-CellPhone.png";
import gamepad from "../../assets/Category-Gamepad.png";
import headphone from "../../assets/Category-Headphone.png";
import watch from "../../assets/Category-SmartWatch.png";

import jbl from "../../assets/jbl.png";
import Ac from "../../assets/Ac.png";
import Headphone from "../../assets/Headphone.png";
import Laptop from "../../assets/Laptop.png";

import "./Home.css";
import Api from "./../ProductApI/Api.jsx";

function Home() {
const [products, setProducts] = useState([]);
const [timeLeft, setTimeLeft] = useState(3 * 24 * 60 * 60);
const [index, setIndex] = useState(0);
const [dbWishlist, setDbWishlist] = useState([]);

const WISHLIST_URL = "https://smartshop-api-oas7.onrender.com/wishlist";

const navigate = useNavigate();
const location = useLocation();

const ads = [ 
              {
                icon: apple,
                title: "iPhone 14 Series",
                offer: "Up to 10%",
                image: phone,
              },
              {
                icon: apple,
                title: "Laptop Sale",
                offer: "Up to 20%",
                image: Laptop,
              },
              {
                icon: LG,
                title: "AC Offer",
                offer: "Up to 30%",
                image: Ac,
              },
              {
                icon: apple,
                title: "Headset Deal",
                offer: "Up to 40%",
                image: Headphone,
              },
              ];

    useEffect(() => {
    const slider = setInterval(() => {
    setIndex((prev) => (prev + 1) % ads.length);
    }, 2000);

    return () => clearInterval(slider);
    }, [ads.length]);

    useEffect(() => {
    const timer = setInterval(() => {
    setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
    }, []);

    useEffect(() => {
    axios
    .get("https://smartshop-api-oas7.onrender.com/product")
    .then((res) => setProducts(res.data || []))
    .catch(() => toast.error("Error fetching products"));
  

    axios
    .get(WISHLIST_URL)
    .then((res) => setDbWishlist(res.data || []))
    .catch(() => console.error("Error fetching wishlist"));
    }, []);

    const formatTime = (sec) => {
    const t = String(Math.floor(sec / (24 * 3600))).padStart(2, "0");
    const h = String(Math.floor((sec % (24 * 3600)) / 3600)).padStart(2, "0");
    const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return { t, h, m, s };
    };

    const time = formatTime(timeLeft);

    const queryParams = new URLSearchParams(location.search);
    const search = queryParams.get("search") || "";

    const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(search.toLowerCase())
    );

    const handleAddToCart = (product) => {
    const isLoggedIn = localStorage.getItem("login");

    if (!isLoggedIn) {
    navigate("/login");
    return;
    }

    axios.post("https://smartshop-api-oas7.onrender.com/cart", product)
    .then(() => {
      toast.success("Product added to cart", {
        autoClose: 1000,
        position: "top-center",
        theme: "dark",
      });
    })
    .catch(() => toast.error("Failed to add cart"));
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
    }
     else
       {
         axios.post(WISHLIST_URL, item)
          .then(() => {
            setDbWishlist((prev) => [...prev, item]);
            toast.success("Added to Wishlist", {
              autoClose: 1000,
              position: "top-center",
        });
      })
      .catch(() => toast.error("Failed to add to wishlist"));
    }
    };

    const handleView = () => {
    navigate("/Allproduct", { state: { allProducts: products } });
    };

    const handleProductClicks = (id) => {
    navigate(`/ProductDetails/${id}`);
    };

    return (
    <div className="home-container">
    <div className="hero-section">
      <div className="hero-left">
        <ul>
          <li>Woman's Fashion</li>
          <li>Men's Fashion</li>
          <li>Electronics</li>
          <li>Home & Lifestyle</li>
          <li>Medicine</li>
          <li>Sports & Outdoor</li>
          <li>Baby's & Toys</li>
          <li>Groceries & Pets</li>
          <li>Health & Beauty</li>
        </ul>
      </div>

      <div className="hero-whole">
        <div className="hero-content">
          <div className="hero-left-content">
            <div className="apple-row">
              <img src={ads[index].icon} alt="icon" />
              <p>{ads[index].title}</p>
            </div>

            <h1>
              {ads[index].offer} <br /> off Voucher
            </h1>

            <button className="shop-btn" onClick={handleView}>Shop Now →</button>
          </div>

          <div className="hero-right">
            <img src={ads[index].image} alt="product" />
          </div>
        </div>
      </div>
    </div>

    <div className="flash-sale">
      <div className="flash-header">
        <div className="flash-box"></div>
        <h4>Today's</h4>
      </div>

      <div className="flash-content">
        <h1 className="flash-title">Flash Sales</h1>

        <div className="timer">
          <div className="timer-box">
            <p>Days</p>
            <h2>{time.t}</h2>
          </div>
          <div className="timer-dot">:</div>
          <div className="timer-box">
            <p>Hours</p>
            <h2>{time.h}</h2>
          </div>
          <div className="timer-dot">:</div>
          <div className="timer-box">
            <p>Minutes</p>
            <h2>{time.m}</h2>
          </div>
          <div className="timer-dot">:</div>
          <div className="timer-box">
            <p>Seconds</p>
            <h2>{time.s}</h2>
          </div>
        </div>
      </div>
    </div>

    <div className="head-product">
      <Api products={filteredProducts} handleAddToCart={handleAddToCart} />
    </div>

    <div className="header-btn1">
      <button onClick={handleView}>View All Product</button>
    </div>

    <div className="catagories-header">
      <h5>Categories</h5>
    </div>

    <h1 className="catagoriesh1">Browse By Categories</h1>

    <div className="catagories-arrows">
      <i className="bi bi-arrow-left leftarrow"></i>
      <i className="bi bi-arrow-right rightarrow"></i>
    </div>

    <div className="catagories">
      <div className="catagories-content">
        <div className="catagories-1">
          <img src={camera} alt="Camera" />
          <p>Camera</p>
        </div>
        <div className="catagories-2">
          <img src={cellphone} alt="Cellphone" />
          <p>Cellphone</p>
        </div>
        <div className="catagories-3">
          <img src={gamepad} alt="Gamepad" />
          <p>Gamepad</p>
        </div>
        <div className="catagories-4">
          <img src={headphone} alt="Headphone" />
          <p>Headphone</p>
        </div>
        <div className="catagories-5">
          <img src={watch} alt="Watch" />
          <p>Watch</p>
        </div>
      </div>
    </div>

    <div className="month-sales">
      <div>
        <h5>This month</h5>
        <h1>Best Selling Products</h1>

        <div className="header-btn2">
          <button onClick={handleView}>View All Product</button>
        </div>
      </div>

      <Api products={filteredProducts} handleAddToCart={handleAddToCart} />
    </div>

    <div className="bananer-container">
    <div className="banner-content">
    <div className="banner-left">
      <p className="banner-category">Categories</p>
      <h1 className="banner-title">
        Enhayce Your <br /> Music Experience
      </h1>

    <div className="timer-rounds">
      <div className="time-box">
        <h2>{time.t}</h2>
        <p>Days</p>
      </div>
      <div className="time-box">
        <h2>{time.h}</h2>
        <p>Hours</p>
      </div>
      <div className="time-box">
        <h2>{time.m}</h2>
        <p>Minutes</p>
      </div>
      <div className="time-box">
        <h2>{time.s}</h2>
        <p>Seconds</p>
      </div>
    </div>

          <button className="buy-btn2">Buy Now!</button>
        </div>

        <div className="banner-right">
          <img src={jbl} alt="JBL Speaker" className="jbl-img" />
        </div>
      </div>
    </div>

    <div className="explore-container">
      <div className="explore-name">
        <h5>Our Products</h5>
      </div>

      <h2>Explore Our Product</h2>

      <div className="explore-map">
        {filteredProducts.map((exploreproduct) => {
          const isLiked = dbWishlist.some((wishItem) => wishItem.id === exploreproduct.id);
          return (
            <article
              className="shop-card"
              key={exploreproduct.id}
              onClick={() => handleProductClicks(exploreproduct.id)}
            >
              <div className="image-section">
                <span className="offer-tag">-35%</span>

                <div className="icon-overlay">
                <button className="circle-btn" onClick={(e) => handleHeartClick(e, exploreproduct)}>
                        <i className={`wishlist-heart bi ${isLiked ? "bi-heart-fill active-heart" : "bi-heart"}`}></i>
                      </button>
                </div>
                <img src={Array.isArray(exploreproduct.image)? exploreproduct.image[0]: exploreproduct.image}alt={exploreproduct.name}className="item-image"/>

                <button className="cart-hover-btn" onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(exploreproduct);}}>

                  <i className="bi bi-cart3"></i> Add To Cart
                </button>
              </div>

              <div className="details-section">
                <h3 className="item-name">{exploreproduct.name}</h3>

                <div className="price-group">
                  <span className="new-price">₹{exploreproduct.price}</span>
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
    </div>

    <div className="bottom-header">
      <h4>Featured</h4>
      <h1>New Arrival</h1>
    </div>

    <div className="bottom-container">
      <div className="bottom-frame1">
        <img src={frame1} alt="PS5" className="frame-img1" />
        <div className="card-content ps5-text">
          <h2>PlayStation 5</h2>
          <p>Black and White version of the PS5 coming out on sale.</p>
          <button>Shop Now</button>
        </div>
      </div>

      <div className="right-section">
        <div className="top-card">
          <img src={frame2} alt="Women Collections" className="frame-img2" />
          <div className="card-content women-text">
            <h2>Women’s Collections</h2>
            <p>Featured woman collections that give you another vibe.</p>
            <button>Shop Now</button>
          </div>
        </div>

        <div className="small-cards">
          <div className="small-card">
            <img src={frame3} alt="Speakers" className="frame-img3" />
            <div className="card-content">
              <h2>Speakers</h2>
              <p>Amazon wireless speakers</p>
              <button>Shop Now</button>
            </div>
          </div>

          <div className="small-card">
            <img src={frame4} alt="Perfume" className="frame-img4" />
            <div className="card-content">
              <h2>Speakers</h2>
              <p>GUCCI INTENSE OUD EDP</p>
              <button>Shop Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="service-container">
      <div className="service-card">
        <div className="service-icon">
          <i className="bi bi-truck"></i>
        </div>
        <h2>FREE AND FAST DELIVERY</h2>
        <p>Free delivery for all orders over ₹140</p>
      </div>

      <div className="service-card">
        <div className="service-icon">
          <i className="bi bi-headset"></i>
        </div>
        <h2>24/7 CUSTOMER SERVICE</h2>
        <p>Friendly 24/7 customer support</p>
      </div>

      <div className="service-card">
        <div className="service-icon">
          <i className="bi bi-shield-check"></i>
        </div>
        <h2>MONEY BACK GUARANTEE</h2>
        <p>We return money within 30 days</p>
      </div>
    </div>
    </div>
    );
    }

    export default Home;