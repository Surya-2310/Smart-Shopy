import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import Navbar from "./Navbar";
import Cart from "./Cart";
import Orders from './Orders';
import Dashboard from'./Dashboard'
import AddProduct from './Product'
import QRgenerator from "./Payment";


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




