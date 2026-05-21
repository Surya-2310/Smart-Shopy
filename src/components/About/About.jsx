import React from 'react'
import Aboutpic from '../../assets/aboutpic.png'
import Fullservices from '../../assets/Fullservices.png'
import employee from '../../assets/founder.png'
import ui from '../../assets/ui.jpg'
import './About.css'

function About() {
  return (
    <div className="about-container">

      <div className="about-top">

        <div className="about-text">
          <h2>Our Story</h2>

          <p>
            Launched in 2026, Exclusive is South Asia’s premier online shopping 
            marketplace with an active presence in INDIA. Supported by a 
            wide range of tailored marketing, data, and service solutions, 
            Exclusive has 10,500 sellers and 300 brands and serves 3 million 
            customers across the region.
          </p><br />


          <p className="small-text">
            Exclusive has more than 1 Million products to offer, growing at a 
            very fast rate. Exclusive offers a diverse assortment in categories 
            ranging from consumer.
          </p> <br />
          <p> MADE IN INDIA❤️</p>
        </div>

        <div className="about-image">
          <img src={Aboutpic}  />
        </div>

      </div>

      
           <div className='about2-servies'>
           <div className='ui-left'>
            <img src={ui} alt="" />
           </div>
           <div className='text-right'>
            <p>

              Our products are designed with high quality, modern style, and customer satisfaction in mind.
               We provide fast and secure delivery to ensure products reach customers safely and on time.
                Customers can enjoy easy online shopping, affordable prices, trusted payment options, and 
                excellent support services.
                 Our goal is to give every customer a smooth shopping experience with reliable
                  products and quick delivery benefits.
            </p>
           </div>
           </div>

           <div className="stats-container">

  <div className="stats-card">

    <div className="stats-icon-outer">
      <div className="stats-icon-inner">
        <i className="bi bi-shop"></i>
      </div>
    </div>

    <h1>10.5k</h1>
    <p>Sellers active our site</p>

  </div>



  <div className="stats-card active-card">

    <div className="stats-icon-outer">
      <div className="stats-icon-inner">
        <i className="bi bi-currency-dollar"></i>
      </div>
    </div>

    <h1>33k</h1>
    <p>Monthly Product Sale</p>

  </div>



  <div className="stats-card">

    <div className="stats-icon-outer">
      <div className="stats-icon-inner">
        <i className="bi bi-gift"></i>
      </div>
    </div>

    <h1>45.5k</h1>
    <p>Customer active in our site</p>

  </div>



  <div className="stats-card">

    <div className="stats-icon-outer">
      <div className="stats-icon-inner">
        <i className="bi bi-cash-coin"></i>
      </div>
    </div>

    <h1>25k</h1>
    <p>Annual gross sale in our site</p>

  </div>

</div>
           <div className="about-employee">
            <img src={employee} alt="" />
           </div>

             <div className="service-container">

        <div className="service-card">

       <div className="service-icon">
       <i className="bi bi-truck"></i>
     </div>

    <h2>FREE AND FAST DELIVERY</h2>

    <p> Free delivery for all orders over ₹140</p>

  </div>


  <div className="service-card">

    <div className="service-icon">
      <i className="bi bi-headset"></i>
    </div>

    <h2>24/7 CUSTOMER SERVICE</h2>

    <p>Friendly 24/7 customer support</p>

  </div>


  <div className="service-card">

    <div className="service-icon">
       <i className="bi bi-shield-check"></i>
    </div>

    <h2>MONEY BACK GUARANTEE</h2>

    <p> We return money within 30 days</p>

  </div>

</div>
    </div>
  )
}

export default About