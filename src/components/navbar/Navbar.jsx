import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {

  const navigate = useNavigate();


  const [show, setShow] = useState(false);

  function Dropdowns() {
    setShow(!show);
  }

  function handleLogout() {
    localStorage.removeItem("login");
    localStorage.removeItem("role");
    navigate("/");
  }

  const role =localStorage.getItem("role");

  return (
    <div>
      <div className="navbar">
      
         <div className="web-name">
          <h2> Smart Shopy</h2>
        </div>

        <ul>
          <li> <Link to="/">Home</Link> </li>
          <li><Link to="/Orders">Orders</Link></li>
           <li> <Link to="/Signup"  onClick={() => setShow(false)}> Signup </Link> </li>
           <li><Link to="/About">About</Link></li>
         
          {role === "Admin" && (
            <>
             <li> <Link to="/Dashboard"> Dashboard</Link> </li>

             </>
              )}
         

        </ul>

   

        <div className="dropdown">
          <ul>
            <li> <Link to="/Cart"><i className="bi bi-cart-check"></i></Link> </li>
            <i className="bi bi-person-circle" onClick={Dropdowns}></i>  

          {show && (

            <div className="dropdown-content">
              <li>
                <Link to="/" onClick={() => { handleLogout(); setShow(false); }}>
                  Logout
                </Link>
              </li>
            </div>

          )}
</ul>
        </div>


      </div>
    </div>
  );
}

export default Navbar;