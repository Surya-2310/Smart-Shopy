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
          </p>

          <p className="small-text">
            Exclusive has more than 1 Million products to offer, growing at a 
            very fast rate. Exclusive offers a diverse assortment in categories 
            ranging from consumer.
          </p>
          <p> MADE IN INDIA❤️</p>
        </div>

        <div className="about-image">
          <img src={Aboutpic}  />
        </div>

      </div>

      <div className="about-services">
        <img src={Fullservices}  />
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
           <div className="about-employee">
            <img src={employee} alt="" />
           </div>
    </div>
  )
}

export default About