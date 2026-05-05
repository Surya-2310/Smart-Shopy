import React from 'react'
import Aboutpic from '../../assets/aboutpic.png'
import Fullservices from '../../assets/Fullservices.png'
import employee from '../../assets/founder.png'

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
            very fast rate.
          </p>

          <p>MADE IN INDIA ❤️</p>
        </div>

        <div className="about-image">
          <img src={Aboutpic} alt="About" />
        </div>

      </div>

      <div className="about-services">
        <img src={Fullservices} alt="Services" />
      </div>

      <div className="about-employee">
        <img src={employee} alt="" />
      </div>

    </div>
  )
}

export default About