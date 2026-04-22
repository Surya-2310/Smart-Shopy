import Login from '../Authentication/Login.jsx';
import Signup from "../Authentication/Signup.jsx";


import Navbar from "../navbar/Navbar.jsx";

import Home from "../pagess/Home.jsx";
import Cart from "../pagess/Cart.jsx";
import Orders from '../pagess/Orders.jsx';
import Dashboard from'../pagess/Dashboard.jsx'
import AddProduct from '../pagess/Product.jsx'
import QRgenerator from "../pagess/Payment.jsx";


import { createBrowserRouter, RouterProvider } from "react-router-dom";

function Routes() {

  const router = createBrowserRouter([
    
    {
      path: "/",
      element:(
        <>
          <Navbar />
          <Home />
        </>
      )
    },
    {
      path: "/login",
      element:(
        <>
          <Navbar />
          <Login />
          </>
      )
    },
    {
      path: "/signup",
      element: (
        <>
        <Navbar />
        <Signup />
        </>
      )
    },
    {
  path: "/cart",
  element: (
    <>
      <Navbar />
      <Cart />
    </>
  )
},{
  path: "/Orders",
  element: (
    <>
      <Navbar />
      <Orders/>
    </>
  )
},{
  path: "/Dashboard",
  element: (
    <>
      <Navbar />
      <Dashboard/>
    </>
  )
},{
  path: "/AddProduct",
  element: (
    <>
      <Navbar />
      <AddProduct/>
    </>
  )
},{
  path:"/Payment",
  element:(
    <>
    <Navbar/>
    <QRgenerator/>
    </>
  )
}

  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default Routes;




