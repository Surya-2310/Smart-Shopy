import Login from "./Authentication/Login";
import Signup from "./Authentication/Signup";
import Home from "./navpage/Home";
import Navbar from "./navbar/Navbar";
import Cart from "./navpage/Cart";
import Orders from './navpage/Orders';
import Dashboard from'./navpage/Dashboard'
import AddProduct from './navpage/Product'
import QRgenerator from "./navpage/Payment";


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




