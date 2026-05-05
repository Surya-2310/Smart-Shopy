import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";


function Buynow() {

  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;

  useEffect(() => {
    if (!data) navigate("/");
  }, [data, navigate]);

  const products = data?.items || [data];

  const total = data?.total || products.reduce(
    (sum, item) =>
      sum + item.price * (item.quantity || 1),
    0
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [door, setDoor] = useState("");
  const [address, setAddress] = useState("");
  const [date] = useState(() => {
    const d = new Date();
    return (
      d.getDate() + "/" +
      (d.getMonth() + 1) + "/" +
      d.getFullYear()
    );
  });

  function handleOrder() {

    if (!name || !email || !mobile || !door || !address) {
      toast.warning("Please fill all fields",{
        autoClose:1000,
      });
      return;
    }

    if (mobile.length !== 10) {
      toast.error("Enter valid mobile number",{
        autoClose:1000,
      });
      return;
    }

    const orderData = {
      name,
      email,
      mobile,
      door,
      address,
      date,
      items: products,
      total
    };

    navigate("/Payment", { state: orderData });
  }

  return (

    <div className="checkout-page">

    

      <div className="billing-section">

        <h2>Billing Details</h2>

        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <input
          placeholder="Door No"
          value={door}
          onChange={(e) => setDoor(e.target.value)}
        />

        <input
          placeholder="Full Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <input value={date} disabled />

      </div>

      

      <div className="order-section">

        <h3>Order Summary</h3>

        {products.map((item) => (

          <div key={item.id} className="order-item">

            <img src={item.image} alt="" />

            <div>
              <p>{item.name}</p>
              <span>₹ {item.price}</span>
              <p>Qty: {item.quantity || 1}</p>
            </div>

          </div>

        ))}

        <div className="price-row">
          <p>Subtotal</p>
          <span>₹ {total}</span>
        </div>

        <div className="price-row">
          <p>Shipping</p>
          <span>Free</span>
        </div>

        <div className="price-row total">
          <p>Total</p>
          <span>₹ {total}</span>
        </div>

        <button className="place-order" onClick={handleOrder}>
          Place Order
        </button>

      </div>

      <ToastContainer />

    </div>
  );
}

export default Buynow;