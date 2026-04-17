import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Cart() {

  const location = useLocation();
  const navigate = useNavigate();

  const productData = location.state;
  

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [currentDate, setCurrentDate] = useState("");

  const [productname,setproductname] = useState(productData?.name || "");

  const [price,setprice] = useState(productData?.price || 0);

  const [image,setimage] = useState(productData?.image || "");

  const total = price * quantity;


  useEffect(() => {

    const today = new Date();

    const date = today.getDate() + "/" +(today.getMonth()+1) + "/" + today.getFullYear();

    setCurrentDate(date);
    console.log(currentDate)

  }, []);

  function handleSubmit(e) {

    e.preventDefault();

    const orderData = {
      date:currentDate,
      name,
      email,
        address,
      productname,
        price,
      quantity,
      total,
      image
    };

    axios.post("http://localhost:3000/orders",orderData) 
     .then(()=>{
       alert("Order Placed Successfully");
          navigate("/");

            setName("");
        setEmail("");
        setAddress("");
        setQuantity(1);
     })
     
    };
      

  return (
    <div className="cart-container">

      <div className="head">
        <h2>Buy Product</h2>
      </div>

      <img src={image} width="150" />

      <form onSubmit={handleSubmit} className="cart-form">

        <label>Date</label>
        <input type="text" value={currentDate} disabled />

        <label>Customer Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Address</label>
        <textarea value={address} onChange={(e) => setAddress(e.target.value)} required />

        <label>Product</label>
        <input type="text" value={productname} disabled />

        <label>Price</label>
        <input type="number" value={price} disabled />

        <label>Quantity</label>
        <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />

        <label>Total Price</label>
        <input type="number" value={total} disabled />

        <button type="submit">  Buy Now </button>
 </form>

    </div>
  );
}

export default Cart;