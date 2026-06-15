import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");

  const isLoggedIn = localStorage.getItem("login") === "true";
  const role = localStorage.getItem("role");

  useEffect(() => {
    axios.get("https://smartshop-api-oas7.onrender.com/cart")
      .then((res) => {
        setTotal(res.data.length);
      })
      .catch((err) => console.error(err));
  }, []);

  function Dropdowns(e) {
    e.stopPropagation();
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      setShow(!show);
    }
  }

  function handleLogout() {
    localStorage.removeItem("login");
    localStorage.removeItem("role");
    navigate("/");
  }

  function handleSearch(e) {
    const value = e.target.value;
    setSearch(value);
    navigate(`/?search=${value}`);
  }

  function sendwhishlist() { 
    navigate('/Wishlist');
  }

  return (
    <div className="navbar" onClick={() => setShow(false)}>
      <div className="logo">
          <Link to="/">
        <span>SMART</span>
        <span>Shopy</span></Link>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
      
        <li>
          <Link to="/About">About</Link>
        </li>
        <li>
          <Link to="/Contact">Contact</Link>
        </li>
      </ul>

      <div className="nav-search">
        <input type="text" placeholder="what are you looking for?" value={search} onChange={handleSearch}/>
        <i className="bi bi-search"></i>
      </div>

      <div className="dropdown">
        <ul>
          <div className="cart-notife">
            <li>
              <Link to="/Cart">
                <i className="bi bi-cart-check">
                  {total > 0 && (
                    <div className="cart-count"><span>{total}</span></div>
                  )}
                </i>
              </Link>
            </li>
          </div>

          <div className="heart-icon">
            <i className="bi bi-heart-fill navbar-heart-icon" onClick={sendwhishlist}></i>
          </div>

          <div className="profile-icon">
            <i className="bi bi-person-circle" onClick={Dropdowns}></i>
          </div>

          {show && isLoggedIn && (
            <div className="dropdown-content">
              <li>
                <Link to="/Orders">My Orders</Link>
              </li>

              {role === "Admin" && (
                <li>
                  <Link to="/Dashboard">Dashboard</Link>
                </li>
              )}

              <li>
                <Link to="/" onClick={(e) => {
                    e.preventDefault(); 
                    handleLogout();
                    setShow(false);
                  }}>Logout</Link>
              </li>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;