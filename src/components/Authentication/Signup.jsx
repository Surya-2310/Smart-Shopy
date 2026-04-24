import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from 'react-toastify';

function Signup() {

  const navigate= useNavigate();

  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [empty, setempty] = useState(false);
  const [same, setsame] = useState(null);


  function handleemail(event) {
    setemail(event.target.value);
    setEmailError(""); 
  }

 
  function checkpass1(event) {
    setPassword(event.target.value);
  }

 
  function checkpass2(event) {
    setconfirmpassword(event.target.value);
  }

  
  function check(event) {
    event.preventDefault();

    
    if (email === "") {
      setEmailError("Please enter email");
      return;
    }

    
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!pattern.test(email)) {
      setEmailError("Invalid email format");
      return;
    }


    if (password === "" || confirmpassword === "") {
      setempty(true);
      setsame(null);
      return;
    }

    setempty(false);

  
    if (password === confirmpassword) {
      setsame(true);

   const user = JSON.parse(localStorage.getItem("users")) ||[]
  const checkemail = user.some((user) =>user.email === email)
      if(checkemail)
         {
      toast.error('Account already exists', {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
        });
        return;
      }
      

      const userdata ={
        email:email,
        password:password, 
        role:"user"
      };

  const users = JSON.parse(localStorage.getItem("users")) || [];

  users.push(userdata)

  localStorage.setItem("users",JSON.stringify(users));


      toast.success('Account created successfully', {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
        });

          setTimeout(()=>{
      navigate('/Login')
          },2500);
      

    setemail("");
    setPassword("");
    setconfirmpassword("");
    
    } else
       {
      setsame(false);
    }
  }

  function handleReset() {
      setemail("");
    setPassword("");
    setconfirmpassword("");
      setEmailError("");
    setsame(null);
    setempty(false);
  }

  return (
    <>
      <form className="signpage" onSubmit={check}>

        <h2>Signup</h2>

        <div className="email">

          <label>Email address</label>
          <input type="email" value={email}onChange={handleemail}className="form-control"/>
        </div>

        {emailError && (<p style={{ color: "red" }}> {emailError}</p>)}

        <div className="pass1">
          <label>Password</label>

          <input type="password"value={password} onChange={checkpass1}className="form-control"/>
        </div>

        {empty && (
          <p style={{ color: "red" }}>
            Please Enter the password
          </p>
        )}

        <div className="pass1">
          <label>Confirm Password</label>
          <input type="password"value={confirmpassword}onChange={checkpass2}className="form-control"/>
        </div>

        {empty && (<p style={{ color: "red" }}>Please Enter the Confirm password</p>)}

        {same === false && (<p style={{ color: "red" }}>Password does not match</p>)}


        <div className="btn-group">

          <button type="submit"className="btn-create">Create Account</button>

          <button type="button"onClick={handleReset}className="btn-reset">Reset</button>

          
 </div>
 <div>
            <p className="sign1">Switch account?<Link to="/login"> Login</Link></p>
</div>
      </form>
      <ToastContainer />
    </>
  );
}

export default Signup;