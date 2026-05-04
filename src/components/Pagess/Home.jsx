import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import frame from '../../assets/Frame 560.png'
import Buynow from './Buynow';
import Cart from './Cart';
import { toast, ToastContainer } from "react-toastify";


function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  

  useEffect(() => {
    axios.get("http://localhost:3000/product")
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

  axios.post("http://localhost:3000/cart", product)

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

  const targetPath =
    isLoggedIn ? "/Buynow" : "/login";

  navigate(targetPath, { state: product });

}

  return (
    <div className="home-container">
      <ToastContainer/>

      <img src={frame} alt="" className="home-frame" />

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

                <button className="addtocart" onClick={() => handleAddToCart(product)}> <i className="bi bi-cart-check"></i>Add to Cart</button>
                {/* <button className="Buynow" onClick={()=> Buynow(product)}>Buynow</button> */}

              </div>
              
            </div>
          ))
        ) : (
          <p className="loading-text">Loading products...</p>
        )}
      </div>
    </div>
  );
}

export default Home;