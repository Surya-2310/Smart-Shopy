import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from '../Pagess/Footer.jsx'

function MainLayout() {
  return (
    <>
      <Navbar />

      <Outlet />

      <Footer />
    </>
  );
}

export default MainLayout;