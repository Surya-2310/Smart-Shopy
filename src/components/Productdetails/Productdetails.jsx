import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Productdetails.css";
import Api from '../ProductApI/Api.jsx';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
            const [product, setProduct] = useState(null);
            const [allProducts, setAllProducts] = useState([]); 
            const [loading, setLoading] = useState(true);
            const [mainImage, setMainImage] = useState("");
            const [count, setCount] = useState(1);
            const [selectedSize, setSelectedSize] = useState('M'); 
            const [selectedColor, setSelectedColor] = useState('red'); 

    useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    axios.get("https://smartshop-api-oas7.onrender.com/product")
         .then((response) => {
          setAllProducts(response.data || []);
        
        const foundProduct = response.data.find((item) => String(item.id) === String(id));
        
        if (foundProduct) {
          setProduct(foundProduct);
          const defaultImg = Array.isArray(foundProduct.image) ? foundProduct.image[0] : foundProduct.image;
          setMainImage(defaultImg);
        } else {
          setProduct(null);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="loading-state">
        <h1>Loading Product Details...</h1>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="loading-state">
        <h1>Product not found.</h1>
      </div>
    );
  }
    
  const handleBuyNow = () => {
    const isLoggedIn = localStorage.getItem("login");

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    navigate("/Buynow", { 
      state: { ...product, quantity: count, size: selectedSize, color: selectedColor } 
    });
  };

  const MultipleImages = Array.isArray(product.image) && product.image.length > 1;
  const imageList = Array.isArray(product.image) ? product.image : [product.image];

  return (
    <div className="product-page-wrapper">
      
      <nav className="breadcrumb">
        <span onClick={() => navigate("/")}>Account</span> / 
        <span>Gaming</span> /
        <span className="current">{product.name}</span>
      </nav>

      <div className="product-main-layout">
        <div className="gallery-section">
        {MultipleImages ? (
         <div className="thumb-stack">
              {imageList.map(function (smallimg, index) {
               return (
                  <div
                    key={index}
                    className="thumb-card"
                    onClick={() => setMainImage(smallimg)}
                  >
                    <img src={smallimg} alt="thumbnail" />
                  </div>
                );
              })}
            </div>
          ) : null}

          <div className="main-display">
            <img src={mainImage} alt={product.name} />
          </div>
        </div>

        <div className="info-section">
          <h1 className="product-title">{product.name}</h1>
          
          <div className="stats-row">
            <div className="stars-group">
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill muted"></i>
              <span className="review-text">(150 Reviews) </span>
            </div>
            <span className="divider">|</span>
            <span className="stock-status"> In Stock</span>
          </div>

          <div className="price-tag">₹{product.price}.00</div>

          <p className="short-desc">
            High-quality product made with durable materials for long-lasting use. 
            Designed for easy handling, smooth performance, and a better user experience. 
            Simple to use, easy to maintain, and suitable for everyday needs.
          </p>

          <hr className="sep-line" />

          <div className="config-row">
            <span className="label">Colours:</span>
            <div className="color-dots">
              <span 
                className={`dot blue ${selectedColor === 'blue' ? 'active' : ''}`} 
                onClick={() => setSelectedColor('blue')}
              ></span>
              <span 
                className={`dot red ${selectedColor === 'red' ? 'active' : ''}`} 
                onClick={() => setSelectedColor('red')}
              ></span>
              </div>
              </div>

            <div className="config-row">
            <span className="label">Size:</span>
            <div className="size-selector">
              {['XS', 'S', 'M', 'L', 'XL'].map(s => (
                <button 
                  key={s} 
                  className={selectedSize === s ? 'active' : ''} 
                  onClick={() => setSelectedSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="purchase-actions">
            <div className="qty-control">
              <button onClick={() => count > 1 && setCount(count - 1)}>−</button>
              <span className="qty-val">{count}</span>
              <button className="plus" onClick={() => setCount(count + 1)}>+</button>
            </div>
            <button className="buy-now-btn" onClick={handleBuyNow}>Buy Now</button>
            <button className="wish-btn"><i className="bi bi-heart"></i></button>
          </div>

          <div className="delivery-card">
            <div className="d-item">
              <i className="bi bi-truck"></i>
              <div className="d-text">
                <div className="d-title">Free Delivery</div>
                <div className="d-sub"><u>Enter your postal code for Delivery Availability</u></div>
              </div>
            </div>
            <div className="d-item">
              <i className="bi bi-arrow-repeat"></i>
              <div className="d-text">
                <div className="d-title">Return Delivery</div>
                <div className="d-sub">Free 30 Days Delivery Returns. <u>Details</u></div>
              </div>
            </div>
          </div>
        </div> 
      </div>

      <div className="related-section">
         <h1 className="related-title">Related Items</h1>
         <Api products={allProducts} />
      </div>
    </div>
  );
}

export default ProductDetails;