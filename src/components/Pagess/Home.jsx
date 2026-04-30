import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


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
    const targetPath = isLoggedIn ? "/cart" : "/login";

    navigate(targetPath, {state: { ...product }});
  }

  const searchProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-container">

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

                <button className="addtocart" onClick={() => handleAddToCart(product)}>Add to Cart</button>

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