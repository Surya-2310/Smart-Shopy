import React from 'react'
import sideimage from '../../assets/aboutpic.png'

function About() {
  return (
    <div className="about-container">
      <div className="about-top">

        <div className="about-text">
          <h2>Our Story</h2>

          <p>
            Launched in 2015, Exclusive is South Asia’s premier online shopping 
            marketplace with an active presence in Bangladesh. Supported by a 
            wide range of tailored marketing, data, and service solutions, 
            Exclusive has 10,500 sellers and 300 brands and serves 3 million 
            customers across the region.
          </p>

          <p className="small-text">
            Exclusive has more than 1 Million products to offer, growing at a 
            very fast rate. Exclusive offers a diverse assortment in categories 
            ranging from consumer.
          </p>
        </div>

        <div className="about-image">
          <img src={sideimage} alt="About" />
        </div>

      </div>
    </div>
  )
}

export default About