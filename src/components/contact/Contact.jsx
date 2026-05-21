import  { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import './Contact.css'

function Contact() {

  const [text,settext]=useState("")
   const [email,setemail]=useState("")
    const [phone,setphone]=useState("")
   
    const [Message,setmessage]=useState("")

  function handlemessage()
  
  {

    if(!text||!phone||!Message||!email){
      toast.error("Fill the all filed",{
        autoClose:500,
        position:"top-center"
      })
      return
    } 

 toast.success("our message has been sent successfully",{
      autoClose:500,
      position:"top-center"  
    })
    setemail(""),
      setmessage(""),
      settext(""),
      setphone("")
  
    
  }
  return (
    <div className="contact-container">
      <ToastContainer/>

      <div className="contact-box">

        
        <div className="contact-left">

          <div className="contact-card1">
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
            <input type="text" placeholder="Your Name *" value={text} onChange={(e)=>settext(e.target.value)} />
            <input type="email" placeholder="Your Email *" value={email} onChange={(e)=>setemail(e.target.value)} />
            <input type="text" placeholder="Your Phone *" value={phone} onChange={(e)=>setphone(e.target.value)}/>
          </div>

          <textarea placeholder="Your Message" value={Message} onChange={(e)=>setmessage(e.target.value)}></textarea>

          <button className="send-btn" onClick={()=>handlemessage()}>Send Message</button>

        </div>

      </div>

    </div>
  );
}

export default Contact;