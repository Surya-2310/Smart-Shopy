import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "./MainLayout.jsx";

import Home from "../Home/Home.jsx";
import Login from "../Authentication/Login/Login.jsx";
import Signup from "../Authentication/Signup.jsx";
import Buynow from "../Buynow/Buynow.jsx";
import Orders from "../Order/Orders.jsx";
import Dashboard from "../Dashboard/Dashboard.jsx";
import AddProduct from "../AddProduct/Product.jsx";
import QRgenerator from "../payment/Payment.jsx";
import Cart from "../Cart/Cart.jsx";
import About from '../About/About.jsx';
import Contact from '../contact/Contact.jsx';
import NotFound from '../Notfound/Notfound.jsx';

function Routes() {

  const move = createBrowserRouter([

    {
      path: "/",
      element: <MainLayout />,
      children: [
                  { index: true, element: <Home/> },
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
                    { path:"*", element: <NotFound/>},

                ] },

   
  ]);
 return <RouterProvider router={move} />;
}

export default Routes;