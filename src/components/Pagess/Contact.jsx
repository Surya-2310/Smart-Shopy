import React from "react";


function Contact() {
  return (
    <div className="contact-container">

      <div className="contact-box">

        
        <div className="contact-left">

          <div className="contact-card">
            <h4>📞 Call To Us</h4>
            <p>We are available 24/7, 7 days a week.</p>
            <p>Phone: +91 6374793301</p>
          </div>

          <div className="contact-card">
            <h4>✉️ Write To Us</h4>
            <p>Fill out our form and we will contact you within 24 hours.</p>
            <p>Email: customer@SmartShopy.com</p>
            <p>Email: support@SmartShopy.com</p>
          </div>

        </div>

        
        <div className="contact-right">

          <div className="form-row">
            <input type="text" placeholder="Your Name *" />
            <input type="email" placeholder="Your Email *" />
            <input type="text" placeholder="Your Phone *" />
          </div>

          <textarea placeholder="Your Message"></textarea>

          <button className="send-btn">Send Message</button>

        </div>

      </div>

    </div>
  );
}

export default Contact;