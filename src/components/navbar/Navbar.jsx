import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Profile from "../assets/profile.png";

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

        <div><h2>Smart Shopy</h2></div>

        <ul>
          <li> <Link to="/">Home</Link> </li>
          <li> <Link to="/Orders">Orders</Link> </li>

          {role === "Admin" && (
            <>
             <li> <Link to="/Dashboard">Dashboard</Link> </li>

             </>
              )}
          

        </ul>


        <div className="dropdown">

          <img src={Profile} onClick={Dropdowns}  />

          {show && (

            <div className="dropdown-content">

              <li> <Link to="/Signup"  onClick={() => setShow(false)}>👏 Signup </Link> </li>

              <li> <Link to="/login"  onClick={() => setShow(false)}>👍 Login  </Link> </li>

              <li> <Link to="/" onClick={()=>{{handleLogout()}{setShow(false)}}}>👎 Logout  </Link> </li>
 </div>

          )}

        </div>


      </div>
    </div>
  );
}

export default Navbar;