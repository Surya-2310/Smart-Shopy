import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Profile from '../../assets/profile.png';
import Webname from'../../assets/webname.png';

function Navbar() {

  const navigate = useNavigate();


  const [show, setShow] = useState(false);

  function Dropdowns() {
    setShow(!show);
  }

  function handleLogout() {

    localStorage.removeItem("isLoggedIn");

    navigate("/");

  }

  const role =localStorage.getItem("role");

  return (
    <div>
      <div className="navbar">

         <div className="web-name">
          <img src={Webname} alt="logo" />
        </div>

        <ul>
          <li> <Link to="/"><i class="bi bi-house-door"></i>  Home</Link> </li>
          <li> <Link to="/Orders"> <i class="bi bi-cart-check"></i>  Orders</Link> </li>

          {role === "Admin" && (
            <>
             <li> <Link to="/Dashboard"><i class="bi bi-speedometer"></i>  Dashboard</Link> </li>

             </>
              )}
          

        </ul>


        <div className="dropdown">

          <img src={Profile} onClick={Dropdowns}  />

          {show && (

            <div className="dropdown-content">

              <li> <Link to="/Signup"  onClick={() => setShow(false)}><i class="bi bi-check-circle"></i>  Signup </Link> </li>

              <li> <Link to="/login"  onClick={() => setShow(false)}><i class="bi bi-box-arrow-in-right"></i>  Login  </Link> </li>

              <li> <Link to="/" onClick={()=>{{handleLogout()}{setShow(false)}}}><i class="bi bi-box-arrow-right"></i>  Logout  </Link> </li>
 </div>

          )}

        </div>


      </div>
    </div>
  );
}

export default Navbar;