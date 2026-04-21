import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App';
import './Styles/Login.css'
import'./Styles/Signup.css'
import './Styles/Navbar.css'
import './Styles/Cart.css'
import'./Styles/Orders.css'
import './Styles/Dasboard.css'
import './Styles/Product.css'
import './styles/Home.css'
import './Styles/Payment.css'


createRoot(document.getElementById('root')).render(

  <StrictMode>
    <App/>
</StrictMode>

);