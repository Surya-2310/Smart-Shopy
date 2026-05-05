import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function Cart() {

  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  function fetchCart() {

    axios
      .get("http://localhost:3000/cart")
      .then((res) => {

        const data = res.data.map((item) => ({
          ...item,
          quantity: item.quantity || 1
        }));

        setCartItems(data);

      })
      .catch((err) => console.log(err));
  }



  function increaseQty(item) {

    axios.patch(
      `http://localhost:3000/cart/${item.id}`,
      {
        quantity: item.quantity + 1
      }
    ).then(fetchCart);

  }



  function decreaseQty(item) {

    if (item.quantity === 1) return;

    axios.patch(
      `http://localhost:3000/cart/${item.id}`,
      {
        quantity: item.quantity - 1
      }
    ).then(fetchCart);

  }



  function removeItem(id) {

    axios
      .delete(`http://localhost:3000/cart/${id}`)
      .then(fetchCart);

  }

  

  const totalProducts = cartItems.reduce(
    (count, item) =>
      count + item.quantity,
    0
  );



  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );



  function handleBuyNow() {

    if (cartItems.length === 0) {
      toast.warning("Cart is empty",{
        autoClose:1000,
      });
      return;
    }

    navigate("/Buynow", {
      state: {
        items: cartItems,
        total: totalPrice
      }
    });

  }

  return (
    <div className="cart-page">

      <h2>My Cart</h2>

      {cartItems.length === 0 ? (

        <p>Your cart is empty</p>

      ) : (

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

                  <img src={item.image}className="table-image" /> {item.name}
                </td>

                <td>₹ {item.price}</td>

                <td>

                  <div className="qty-box">

                    <button onClick={() => decreaseQty(item) }>-</button>

                    <span> {item.quantity} </span>

                    <button  onClick={() => increaseQty(item)} >+</button>

                  </div>

                </td>

                <td> ₹ {item.price * item.quantity} </td>

                <td> <button className="remove-btn" onClick={() => removeItem(item.id)} > Remove</button></td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

      {/* Summary */}

      <div className="cart-summary">

        <h3> Total Products: {totalProducts}</h3>

        <h2>Total Price: ₹ {totalPrice}</h2>

        <button className="buy-btn" onClick={handleBuyNow} > Buy Now</button>

      </div>

    </div>
  );
}

export default Cart;