import  { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import confetti from "canvas-confetti";
import { Wallet, Smartphone, CreditCard, CheckCircle, X } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import "./Payment.css";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const customerdetails = location.state;
  const amount = customerdetails?.total || 0;

  const [paymentMethod, setPaymentMethod] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "" });

  const qrValue = `upi://pay?pa=suryaseetharaman0@okhdfcbank&pn=SmartShopy&am=${amount}&cu=INR`;

  const handleSelectMethod = (method) => {
    setPaymentMethod(method);
    setOrderPlaced(false);
    setIsModalOpen(true);
    setCardDetails({ number: "", expiry: "", cvv: "" });
  };

  const closeModal = () => {
    if (!orderPlaced) {
      setIsModalOpen(false);
    }
  };

  const celebrate = () => {
    confetti({
      particleCount: 250,
      spread: 1220,
      origin: { y: 0.6 }
    });
  };

  const createOrder = () => {
    const orderData = {...customerdetails,
      paymentMethod: paymentMethod,
      status: "Placed", ...(paymentMethod === "Card" && { card: { ...cardDetails } })
    };

    axios.post("https://smartshop-api-oas7.onrender.com/orders", orderData)
      .then(() => {
        setOrderPlaced(true);
        celebrate();

    
        setTimeout(() => {
          setIsModalOpen(false);
          navigate("/");
        }, 5000);
      })
      .catch(() => {
        toast.error("Failed to place order. Please try again.");
      });
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    createOrder();
  };

  return (
    <div className="payment-page">

      <div className="split-payment-wrapper">
        
    <div className="payment-summary-panel">
      <div className="brand-header">
        <h2>SmartShopy</h2>
        <p>Secure Checkout Gateway</p>
      </div>
          <div className="amount-display-box">
            <span>Total Payable Amount</span>
            <h1>₹{amount}</h1>
          </div>
          <div className="security-note">
            <p>🔒 256-Bit SSL Encrypted Connection</p>
          </div>
        </div>

        
        <div className="payment-options-panel">
          <p className="panel-title-label">Select Preferred Payment Method</p>

          <div className="payment-methods-stack">
  
  <div className="method-box-card" onClick={() => handleSelectMethod("Cash")}>
<div className="method-box-icon cod-icon">
  <Wallet size={26} /></div>
<div className="method-box-info">
  <h4>Cash on Delivery</h4>
  <p>Pay with cash upon delivery</p>
</div>
  </div>

  <div className="method-box-card" onClick={() => handleSelectMethod("GPay")}>
    <div className="method-box-icon upi-icon">
  <Smartphone size={26} /></div>
    <div className="method-box-info">
  <h4>GPay / UPI Payment</h4>
  <p>Click to open QR Code window</p>
    </div>
  </div>

  <div className="method-box-card" onClick={() => handleSelectMethod("Card")}>
    <div className="method-box-icon card-icon">
      <CreditCard size={26} /></div>
    <div className="method-box-info">
      <h4>Credit / Debit Card</h4>
      <p>Pay securely using your card</p>
    </div>
  </div>

          </div>
        </div>

      </div>

      <div className={`modal-view-overlay ${isModalOpen ? "active" : ""}`} onClick={closeModal}>
        <div 
          className={`modal-small-content ${orderPlaced ? "success-state" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          
          {!orderPlaced && (
            <button className="modal-close-icon-btn" onClick={closeModal}>
              <X size={18} />
            </button>
          )}
          {!orderPlaced ? (
            <div className="modal-body-form">
              <h3>
                {paymentMethod === "Cash" ? "Cash On Delivery" : paymentMethod === "GPay" ? "Scan QR Code" : "Card Payment"}
              </h3>
              
    {paymentMethod === "GPay" ? (
      <div className="modal-qr-display-area">
        <p>Scan to Pay ₹{amount}</p>
        <div className="qr-container-border">
          <QRCodeCanvas value={qrValue} size={180} />
        </div>
        <button type="button" className="modal-pay-now-btn" onClick={createOrder}>
          Confirm Payment
        </button>
      </div>
    ) : (
      <form onSubmit={handleModalSubmit}>
        {paymentMethod === "Cash" && (
          <p className="modal-info-alert">Please keep the exact cash amount ready at the time of delivery.</p>
        )}

        {paymentMethod === "Card" && (
          <div className="card-input-wrapper">
    <div className="input-element-block">
      <label>Card Number</label>
      <input type="text" placeholder="XXXX XXXX XXXX XXXX" maxLength="19" required 
        value={cardDetails.number} onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
      />
    </div>
            <div className="input-element-row">
        <div className="input-element-block">
          <label>Expiry Date</label>
          <input type="text" placeholder="MM/YY" maxLength="5" required 
            value={cardDetails.expiry} onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
          />
        </div>
      <div className="input-element-block">
        <label>CVV</label>
        <input type="password" placeholder="****" maxLength="4" required 
          value={cardDetails.cvv} onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
        />
      </div>
            </div>
          </div>
        )}

        <button type="submit" className="modal-pay-now-btn">
          Place Order
        </button>
      </form>
    )}
  </div>
          ) : (
            <div className="modal-green-success-state active-popup-anim">
              <div className="success-big-tick">
                <CheckCircle size={84} color="#ffffff" strokeWidth={2.5} />
              </div>
              <h2>Payment Successful!</h2>
              <p>Order Successfully Placed</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Payment;