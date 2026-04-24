import axios from "axios";
import React, { useEffect, useState } from "react";
import computing from '../../assets/computing.png';
import { Bounce, toast, ToastContainer } from "react-toastify";


function Orders() {

  const [order, setOrder] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/orders")
      .then((res) => setOrder(res.data))
      .catch((err) => console.log(err));
  }, []);

  function handleDelete(id) {

  axios.delete(`http://localhost:3000/orders/${id}`)
    .then(() => {setOrder(order.filter((item) => item.id !== id));

      toast.success("Order successfully deleted");

    })
    .catch((err) => {console.log(err);
      toast.error("Failed to delete order");

    });

}
  return (
    <div className="orders-container">
      <ToastContainer/>

      <h1 className="orders-title">
        Orders List
      </h1>

      {order.length === 0 ? (
        <>
        <h2 className="no-orders">
          No Orders Found
        </h2>

        <img className="img-noorder" src={computing}/>
        </>
      ) : (

        order.map((item) => (

          <div key={item.id} className="order-card" >

            <img src={item.image}  className="order-image" alt="product" />

                <div className="order-details">

        <h3 className="order-product"> {item.product} </h3>

          <p className="order-text">Date:{item.date}</p>

        <p className="order-text"> Name: {item.name} </p>

        <p className="order-text"> Email: {item.email} </p>

        <p className="order-text"> Address: {item.address} </p>

        <p className="order-text"> Quantity: {item.quantity} </p>

      <p className="order-total"> Total: ₹{item.total} </p>
 </div>
  
  <div className="order-delete">
      <button onClick={()=>{handleDelete(item.id)}}>Delete item</button>
          </div>
</div>
        ))

      )}

    </div>
  );
}

export default Orders;