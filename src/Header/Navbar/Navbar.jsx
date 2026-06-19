import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

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
          <span>Shopy</span>
        </Link>
      </div>

      <ul className={`nav-links ${menuOpen ? "show-menu" : ""}`}>
        <li>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        </li>
        <li>
          <Link to="/About" onClick={() => setMenuOpen(false)}>About</Link>
        </li>
        <li>
          <Link to="/Contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        </li>
      </ul>

      <div className="nav-search">
        <input 
          type="text" 
          placeholder="What are you looking for?" 
          value={search} 
          onChange={handleSearch}
        />
        <i className="bi bi-search"></i>
      </div>

      <div className="nav-actions">
        <div className="cart-notife">
          <Link to="/Cart">
            <i className="bi bi-cart-check">
              {total > 0 && (
                <div className="cart-count"><span>{total}</span></div>
              )}
            </i>
          </Link>
        </div>

        <div className="heart-icon">
          <i className="bi bi-heart-fill navbar-heart-icon" onClick={sendwhishlist}></i>
        </div>

        <div className="profile-container">
          <i className="bi bi-person-circle profile-icon" onClick={Dropdowns}></i>
          
          {show && isLoggedIn && (
            <ul className="dropdown-content">
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
            </ul>
          )}
        </div>
      </div>

      <div className="mobile-menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        <i className={`bi ${menuOpen ? "bi-x-lg" : "bi-list"}`}></i>
      </div>
    </div>
  );
}

export default Navbar;