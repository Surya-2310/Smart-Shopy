import axios from "axios";
import  { useEffect, useState } from "react";
import computing from '../../assets/computing.png';
import { toast, ToastContainer } from "react-toastify";
import './Orders.css'


function Orders() {

  const [order, setOrder] = useState([]);

  useEffect(() => {
    axios.get("https://smartshop-api-oas7.onrender.com/orders")
      .then((res) => setOrder(res.data))
      .catch((err) => console.log(err));
  }, []);

 

  function handleDelete(id) {

  axios.delete(`https://smartshop-api-oas7.onrender.com/orders/${id}`)
    .then(() => {setOrder(order.filter((item) => item.id !== id));

      toast.success("Order successfully cancelled",{
        autoClose:500,
      });

    })
    .catch((err) => {console.log(err);
      toast.error("Failed to cancelled order",{
        autoClose:500,
      });

    });

}
  return (
    <div className="orders-container">
      <ToastContainer/>

      <h1 className="orders-title"> Orders List</h1>

      {order.length === 0 ? (
        <>
        <h2 className="no-orders">No Orders Found</h2>

        <img className="img-noorder" src={computing}/>
        </>
      ) : (

        order.map((item) => (

          <div key={item.id} className="order-card" >

           <img src={Array.isArray(item.items?.[0]?.image)? item.items[0].image[0]: item.items?.[0]?.image || computing} className="order-image"/>

                <div className="order-details">

        <h3 className="order-product"> {item.items?.[0]?.name || "No Product"} </h3>


        <p className="order-text"> Name: {item.name} </p>

        <p className="order-text"> Email: {item.email} </p>

        <p className="order-text">Quantity: {item.items?.[0]?.quantity}</p>

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