import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar.jsx";
import Footer from '../components/Footer/Footer.jsx'
import ScrollToTop from './Navbar/Scroll';

function MainLayout() {
  return (
    <>
    <ScrollToTop/>
    
      <Navbar />

      <Outlet />

      <Footer />
    </>
  );
}

export default MainLayout;