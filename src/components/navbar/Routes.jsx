import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "./MainLayout.jsx";

import Home from "../Pagess/Home.jsx";
import Login from "../Authentication/Login.jsx";
import Signup from "../Authentication/Signup.jsx";
import Buynow from "../Pagess/Buynow.jsx";
import Orders from "../Pagess/Orders.jsx";
import Dashboard from "../Pagess/Dashboard.jsx";
import AddProduct from "../Pagess/Product.jsx";
import QRgenerator from "../Pagess/Payment.jsx";
import Cart from "../Pagess/Cart.jsx";
import About from '../Pagess/About.jsx';

function Routes() {

  const router = createBrowserRouter([

    {
      path: "/",
      element: <MainLayout />,

      children: [

        { path: "/", element: <Home /> },

        { path: "/Buynow", element: <Buynow /> },

        { path: "/Orders", element: <Orders /> },

        { path: "/Dashboard", element: <Dashboard /> },

        { path: "/AddProduct", element: <AddProduct /> },

        { path: "/Payment", element: <QRgenerator /> },

        { path: "/Cart", element: <Cart /> },

          { path: "/About", element: <About /> }


      ]
    },

    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/signup",
      element: <Signup />
    }

  ]);

  return <RouterProvider router={router} />;
}

export default Routes;