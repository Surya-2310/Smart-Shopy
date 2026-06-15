import axios from "axios";
import  { useEffect, useState } from "react";
import computing from '../../assets/computing.png';
import { toast } from "react-toastify";
import Gif from '../../assets/Gif.svg';
import './Orders.css'


function Orders() {

  const [order, setOrder] = useState([]);
  const [loading,setLoading]=useState(true);

useEffect(() => {
  setLoading(true);

  axios.get("https://smartshop-api-oas7.onrender.com/orders")
    .then((res) => setOrder(res.data))
    .catch(()=>{
      toast.error("Failed to load orders")
    }
  )
    .finally(() => {
      setLoading(false);
    });
}, []);

  function handleDelete(id) {

  axios.delete(`https://smartshop-api-oas7.onrender.com/orders/${id}`)
    .then(() => {
      setOrder(order.filter((item) => item.id !== id));
      toast.success("Order successfully cancelled", {
        autoClose: 500,
      });
    })
    .catch(()=>{
      toast.error("Failed to cancel order"  );
    } 
    )

}
return (
  <div className="orders-container">
 {loading ? (
  <div className="loading-containers">
    <img src={Gif} alt="Loading" />
    <h2 className="loading-title">Loading Orders...</h2>
  </div>
) : order.length === 0 ? (
      <div className="empty-orders">
        <i className="bi bi-bag-heart empty-order-icon"></i>
        <h2 className="no-orders">No Orders Found</h2>
        <p>Your placed orders will appear here.</p>
      </div>
    ) : (
      <>
        <h1 className="orders-title">My Orders</h1>

        {order.map((item) => (
          <div key={item.id} className="order-card">
            <img
              src={Array.isArray(item.items?.[0]?.image)? item.items[0].image[0]: item.items?.[0]?.image || computing}
              alt="product"
              className="order-image"
            />

            <div className="order-details">
              <h3 className="order-product">
                {item.items?.[0]?.name || "No Product"}
              </h3>

              <p className="order-text">Name: {item.name}</p>
              <p className="order-text">Email: {item.email}</p>
              <p className="order-text">
                Quantity: {item.items?.[0]?.quantity}
              </p>

              <p className="order-total">
                Total: ₹{item.total}
              </p>
            </div>

            <div className="order-delete">
              <button onClick={() => handleDelete(item.id)}>
                Delete Item
              </button>
            </div>
          </div>
        ))}
      </>
    )}
  </div>
);}
export default Orders;