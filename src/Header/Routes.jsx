import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "./MainLayout.jsx";

import Home from "../components/Home/Home.jsx";
import Login from "../Authentiction/Login/Login.jsx";
import Signup from "../Authentiction/Signup/Signup.jsx";
import Buynow from "../components/Buynow/Buynow.jsx";
import Orders from "../components/Order/Orders.jsx";
import Dashboard from "../components/Dashboard/Dashboard.jsx";
import AddProduct from "../components/AddProduct/Product.jsx";
import QRgenerator from "../components/payment/Payment.jsx";
import Cart from "../components/Cart/Cart.jsx";
import About from '../components/About/About.jsx';
import Contact from '../components/contact/Contact.jsx';
import NotFound from '../components/Notfound/Notfound.jsx';
import Api from './../components/ProductApI/Api.jsx';
import Whishlist from './../components/whishlist/Whishlist.jsx';
import ProductDetails from '../components/Productdetails/Productdetails.jsx'
function Routes() {

  const move = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "Buynow", element: <Buynow /> },
        { path: "Orders", element: <Orders /> },
        { path: "Dashboard", element: <Dashboard /> },
        { path: "AddProduct", element: <AddProduct /> },
        { path: "Payment", element: <QRgenerator /> },
        { path: "Cart", element: <Cart /> },
        { path: "About", element: <About /> },
        { path: "login", element: <Login /> },
        { path: "signup", element: <Signup /> },
        { path: "Contact", element: <Contact /> },
        { path: "Api", element: <Api /> },
        { path: "Whishlist", element: <Whishlist /> },
        { path: "ProductDetails/:id", element: <ProductDetails /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);
 return <RouterProvider router={move} />;
}

export default Routes;