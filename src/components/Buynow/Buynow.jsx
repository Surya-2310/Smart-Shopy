import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Buynow.css";

function Buynow() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  const products = data?.items || (data?.id ? [data] : []);
  const total = data?.total || products.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const [formData, setFormData] = useState({
    name: "", company: "", street: "", apartment: "", city: "", phone: "", email: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function handleOrder() {
    const { name, street, city, phone, email } = formData;
    if (!name || !street || !city || !phone || !email) {
      toast.warning("Please fill all required fields", { autoClose: 1000 });
      return;
    }
    navigate("/Payment", { state: { ...formData, items: products, total } });  
  }

  return (
    <div className="checkout-page">
      <div className="billing-section">
        <h2>Billing Details</h2>
        <div className="input-group">
          <label>First Name<span className="required-star">*</span></label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label>Company Name</label>
          <input type="text" name="company" value={formData.company} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label>Street Address<span className="required-star">*</span></label>
          <input type="text" name="street" value={formData.street} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label>Apartment, floor, etc. (optional)</label>
          <input type="text" name="apartment" value={formData.apartment} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label>Town/City<span className="required-star">*</span></label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label>Phone Number<span className="required-star">*</span></label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label>Email Address<span className="required-star">*</span></label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="save-info">
          <input type="checkbox" id="save" />
          <label htmlFor="save">Save this information for faster check-out next time</label>
        </div>
      </div>

      <div className="order-section">
        {products.map((item) => (
          <div className="order-item" key={item.id}>
            <div className="product-info">
  
              <img src={Array.isArray(item.image) ? item.image[0] : item.image}/>
              <p>{item.name}</p>
            </div>
            <span>₹{item.price * (item.quantity || 1)}</span>
          </div>
        ))}

        <div className="price-row"><p>Subtotal:</p><span>₹{total}</span></div>
        <div className="price-row"><p>Shipping:</p><span>Free</span></div>
        <div className="price-row"><p>Total:</p><span>₹{total}</span></div>

        <div className="coupon-box">
          <input type="text" placeholder="Coupon Code" />
          <button type="button">Apply Coupon</button>
        </div>

        <button className="place-order" onClick={handleOrder}>Place Order</button>
      </div>
    </div>
  );
}

export default Buynow;