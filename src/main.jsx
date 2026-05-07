import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/Header/App.jsx'
import './Styles/Login.css'
import './Styles/Signup.css'
import './Styles/Navbar.css'
import './Styles/Buynow.css'
import './Styles/Orders.css'
import './Styles/Dasboard.css'
import './Styles/Product.css'
import './Styles/Home.css'
import './Styles/Payment.css'
import './Styles/Cart.css'
import './Styles/Footer.css'
import './Styles/About.css'
import './Styles/Contact.css'
import './Styles/Notfound.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);