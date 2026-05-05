import { Link } from "react-router-dom";
import footerimg from '../../assets/webname.png'


function Footer() {

  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-col">
 
       <img src={footerimg} alt="" className="footer-logo"/>

          <p>
            Your one-stop shop for all
            products at best prices
          </p>

        </div>

        <div className="footer-col">

          <h3>Quick Links</h3>

          <ul>
             <li><Link to="/">Home</Link> </li>

            <li> <Link to="/Cart">Cart</Link> </li>

            <li> <Link to="/login">Login</Link> </li>

            <li> <Link to="/About">About</Link></li>
 </ul>

    </div>

        <div className="footer-col">

          <h3>Contact</h3>

          <p>Email: support@smartshopy.com</p>

          <p>Phone: +91 6374793309</p>

          <p>Kumbakonam, India</p>

        </div>

        <div className="footer-col">

          <h3>Follow Us</h3>

          <div className="social-icons">

            <i class="bi bi-facebook"></i>

            <i class="bi bi-instagram"></i>

            <i class="bi bi-twitter-x"></i>

            <i class="bi bi-youtube"></i>

          </div>

        </div>

      </div>

      <div className="footer-bottom">

        @ 2026 Smart Shopy. All Rights Reserved.

      </div>

    </footer>
  );
}

export default Footer;