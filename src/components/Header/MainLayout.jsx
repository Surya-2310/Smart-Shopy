import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar.jsx";
import Footer from '../Footer/Footer.jsx'

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