import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";
// import Confetti from "react-confetti";
import confetti from "canvas-confetti";

function Payment() {

  const location = useLocation();
  const navigate = useNavigate();

  const customerdetails = location.state;

  const amount = customerdetails?.total || 0;

  const [paymentMethod, setPaymentMethod] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

const qrValue = `upi://pay?pa=suryaseetharaman0@okhdfcbank&pn=SmartShopy&am=${amount}&cu=INR`;

  const handleChange = (e) => {
    setPaymentMethod(e.target.value);
    setShowQR(false);
    setOrderPlaced(false);
  };

  const celebrate = () => {
  confetti({
    particleCount: 2000,
    spread: 100,
    origin: { y: 0 }
  });
};

  const createOrder = () => {

    const orderData = {
      ...customerdetails,
      paymentMethod: paymentMethod,
      status: "Placed"
    };

    axios.post("http://localhost:3000/orders", orderData)
      .then(() => {

       celebrate();

        toast.success("Order Placed Successfully",{
          position:"top-right",
          autoClose:1000,
          transition:Bounce
        })

        setOrderPlaced(true);

        setTimeout(() => {
          navigate("/");
        }, 4000);

      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePlaceOrder = () => {

    if (!paymentMethod) {
      // alert("Please select payment method");
      toast.error("Please select payment method",{
        position:"top-right",
        transition:Bounce,
        autoClose:1000
      })
      
      return;
    }

    if (paymentMethod === "Cash") {
      createOrder();
    }

    if (paymentMethod === "GPay") {
      setShowQR(true);
    }
  };

  const handleConfirmPayment = () => {
    createOrder();
  };

  return (
    <div className="payment-container">
      <ToastContainer/>

       {showConfetti && <Confetti />}

      <h2 className="payment-title"> Payment </h2>

      <h4 className="payment-amount"> Total Amount: ₹{amount} </h4>

      <div className="payment-options">

        <label>
          <input type="radio" name="payment" value="Cash" onChange={handleChange} />💵 Cash on Delivery </label>
  <br /><br />

        <label> <input type="radio" name="payment" value="GPay" onChange={handleChange} />💳 GPay /🏛️ UPI </label>

      </div>

      <br />
      
      <button className="place-order-btn" onClick={handlePlaceOrder} > Place Order </button>

      <br /><br />

      {showQR && (
        <div className="qr-section">

          <h3>  Scan to Pay ₹{amount}</h3>

          <QRCodeCanvas  value={qrValue} size={150}  />

          <br /><br />

          <button className="confirm-btn"  onClick={handleConfirmPayment} >  Confirm Payment </button>

        </div>
      )}

      {orderPlaced && (<h2 className="success-message"> Order placed successfully! </h2>)}

    </div>
  );
}

export default Payment;