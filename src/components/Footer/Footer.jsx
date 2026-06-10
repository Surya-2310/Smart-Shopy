import { Link } from "react-router-dom";
import footerimg from '../../assets/webname.png'
import setqr from '../../assets/QR.png'
import './Footer.css'


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

            <i className="bi bi-facebook"  onClick={() => window.open("https://www.facebook.com/")}></i>

            <i className="bi bi-instagram"  onClick={() => window.open("https://www.instagram.com/surya_crz_23/")}></i>

            <i className="bi bi-twitter-x"  onClick={() => window.open("https://x.com/")}></i>

          <i className="bi bi-youtube" onClick={() => window.open("https://www.youtube.com")}></i>
          </div>

           <div className="footer-qr">
             <img src={setqr} alt="" />
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