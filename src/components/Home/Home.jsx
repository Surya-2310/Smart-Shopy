import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import frame from '../../assets/Frame 560.png'
import { toast, ToastContainer } from "react-toastify";
import Frame740 from '../../assets/Frame740.png'
import Star from '../../assets/Star.png'
import './Home.css'
import service from '../../assets/Fullservices.png'
import product4 from '../../assets/product4.png'
import product3 from '../../assets/product3.png'
import product2 from '../../assets/frame2.png'

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
    const [timeLeft, setTimeLeft] = useState(3*24*60*60);
  const navigate = useNavigate();

 useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  
  const formatTime = (sec) => {
    const t = String(Math.floor(sec / (24 * 3600))).padStart(2,"0");
  const h = String(Math.floor((sec % (24 * 3600)) / 3600)).padStart(2, "0");   
     const m = String(Math.floor((sec %3600) / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return { h, m, s,t };
  };

  const time = formatTime(timeLeft);



  useEffect(() => {
    axios.get("https://smartshop-api-oas7.onrender.com/product")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

 function handleAddToCart(product) {

  const isLoggedIn = localStorage.getItem("login");

  if (!isLoggedIn) {
    navigate("/login");
    return;
  }

 axios.post("https://smartshop-api-oas7.onrender.com/cart",product)

    .then(() => {

      toast.success("Product added to cart",{
        autoClose:1000,
        position:"top-center",
        theme:"dark",
      });


    })

    .catch((err) => {
      console.log(err);
    });
 }
  const searchProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  function Buynow(product){

  const isLoggedIn = localStorage.getItem("login");

  const targetPath = isLoggedIn ? "/Buynow" : "/login";

  navigate(targetPath, { state: product });

}

  return (
    <div className="home-container">
      <ToastContainer/>
      
    <div className="hero-section">

 
  <div className="hero-left">
    <ul>
      <li>Woman's Fashion </li>
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

  <div className="hero-right">
    <img src={frame} alt="banner" />
  </div>

</div>

   <div className="flash-sale">
        <h4> Flash Sales</h4>

        {timeLeft === 0 ? (
          <h3 className="ended">Sale Ended</h3>
        ) : (
          <div className="timer">
            
            <div>
              <p>day </p>
              <h3>{time.t}</h3>
            </div>
           
            <div>
              <p>Hours</p>
              <h3>{time.h}</h3>
            </div>
            <div>
              <p>Minutes</p>
              <h3>{time.m}</h3>
            </div>
            <div>
              <p>Seconds</p>
              <h3>{time.s}</h3>
            </div>
          </div>
        )}
      </div><br />
      <h1 className="main-title">Our Products</h1>
      
      <div className="search-section">

        <input type="text"  placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} className="search-input" />

        <button onClick={() => setSearch("")} className="clear-button">Clear</button>
      </div>

      <div className="product-grid">

        {searchProducts.length > 0 ? (

          searchProducts.map((product) => (
            
            <div className="product-card" key={product.id}>

              <div className="image-card">

                <img src={product.image}  className="product-img"/>
              </div>
              
              <div className="product-info">

                <h3 className="product-title">{product.name}</h3>

                <p className="product-price">₹ {product.price}</p>

                 <img src={Star} alt="" />
                <div className="homebtn">
                <button className="addtocart" onClick={() => handleAddToCart(product)}> <i className="bi bi-cart-check"></i>Cart</button>
                <button className="Buynowbtn" onClick={()=> Buynow(product)}>Buynow</button>
               </div>
              </div>
              
            </div>
            
          ))

           
        ) : (
          <p className="loading-text">Loading products...</p>
        )}
      </div>
       <div className="bottom-frame">
                <img src={Frame740} alt="frame" />
              </div>

              <div className="bottom-product4">
                <img src={product4}alt="" />
              </div>

               <div className="bottom-product3">
                <img src={product3}alt="" />
              </div>

            <div className="bottom-frame1">
                <img src={product2}alt="" />
              </div>
              <div className="bottom-service">
                <img src={service} alt="" />
              </div>
    </div>
  );
}

export default Home;