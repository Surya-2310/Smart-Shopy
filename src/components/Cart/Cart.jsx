import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./Cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  function fetchCart() {
    axios
      .get("https://smartshop-api-oas7.onrender.com/cart")
      .then((res) => {
        const data = res.data.map((item) => ({
          ...item,
          quantity: item.quantity || 1,
        }));
        setCartItems(data);
      })
      .catch((err) => toast.error(err));
  }

  function increaseQty(item) {
    axios
      .patch(`https://smartshop-api-oas7.onrender.com/cart/${item.id}`, {
        quantity: item.quantity + 1,
      })
      .then(fetchCart);
  }

  function decreaseQty(item) {
    if (item.quantity === 1) return;

    axios
      .patch(`https://smartshop-api-oas7.onrender.com/cart/${item.id}`, {
        quantity: item.quantity - 1,
      })
      .then(fetchCart);
  }

  function removeItem(id) {
    axios
      .delete(`https://smartshop-api-oas7.onrender.com/cart/${id}`)
      .then(fetchCart);
  }

  const totalProducts = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  function handleBuyNow() {
    if (cartItems.length === 0) {
      toast.warning("Cart is empty", {
        autoClose: 1000,
      });
      return;
    }

    navigate("/Buynow", {
      state: {
        items: cartItems,
        total: totalPrice,
      },
    });
  }

  return (
    <div className="cart-page">

      {cartItems.length === 0 ? (
        <div className="empty-cart">
         
<i className="bi bi-cart-x empty-cart-icon"></i>
    
   <h2>Your Cart is Empty</h2>
    <p>Add some products to your cart and start shopping!</p>
        </div>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="product-cell">
                     
                    <img
                      className="table-image" src={Array.isArray(item.image) ? item.image[0] : item.image} alt={item.name}
                    />
                    <span>{item.name}</span>
                  </td>
                  <td>₹ {item.price}</td>
                  <td>
                    <div className="qty-box">
                      <div className="qty-number">{item.quantity}</div>
                      <div className="qty-icons">
                        <i
                          className="bi bi-chevron-up"
                          onClick={() => increaseQty(item)}
                        ></i>
                        <i
                          className="bi bi-chevron-down"
                          onClick={() => decreaseQty(item)}
                        ></i>
                      </div>
                    </div>
                  </td>
                  <td>₹ {item.price * item.quantity}</td>
                  <td>
                    <button
                      className="remove-btn"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-actions">
            <button className="return-btn" onClick={() => navigate("/")}>
              Return To Shop
            </button>
            <button className="update-btn" >
              Update Cart
            </button>
          </div>

          <div className="bottom-cart">
            <div className="coupon-box">
              <input type="text" placeholder="Coupon Code" />
              <button>Apply Coupon</button>
            </div>

            <div className="cart-summary">
              <h2>Cart Total</h2>

              <div className="summary-row">
                <p>Total Products</p>
                <span>{totalProducts}</span>
              </div>

              <div className="summary-row">
                <p>Shipping</p>
                <span>Free</span>
              </div>

              <div className="summary-row">
                <p>Total</p>
                <span>₹ {totalPrice}</span>
              </div>

              <button className="checkout-btn" onClick={handleBuyNow}>
                Proceed to checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;