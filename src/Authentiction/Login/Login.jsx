import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, Bounce } from 'react-toastify';
import './Login.css';
import imagecart from '../../assets/Side Image.png';

function Login() {

  const navigate = useNavigate();
  const location = useLocation();

  const product = location.state;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {

    const users = JSON.parse(localStorage.getItem("users"));
 
    if (!users || users.length === 0) 
      {

      const defaultAdmin = [
        {
          email: "admin@gmail.com",
          password: "admin123",
          role: "Admin"
        }
      ];

      localStorage.setItem( "users",JSON.stringify(defaultAdmin));

    }

  }, []);

  function handleLogin(event) {

    event.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const validUser = users.find(
      (user) =>
        user.email === email &&
        user.password === password
    );

    if (validUser) 
      {

      localStorage.setItem("login", "true");

      localStorage.setItem("role",validUser.role);

      

      if (validUser.role === "Admin") 
        {
         toast.success("Admin login sucessfully",{
          position:"top-center",
          autoClose:1000,
          transition:Bounce

         })

         setTimeout(()=>{
           navigate("/");
         },1500)

      } 
      else 
        {

        if (product)
           {
          navigate("/Buynow", { state: product });
        }
         else
           {
           toast.success("User login successfully",{
                      position:"top-center",
                      autoClose:1000,
                      transition:Bounce,
                      theme:"dark"
                    })

                    setTimeout(()=>{
              navigate("/")
                    },2000)
        }

      }

      setEmail("");
      setPassword("");

    } 
    else {

    
         toast.warning("Invalid Email or Password",{
          position:"top-center",
          transition:Bounce,
          autoClose:1000
         })
         setEmail("");
      setPassword("");
    }

  }

return (
    <div className="login-container">

     
      <div className="login-left">
        <img src={imagecart} alt="shopping" />
      </div>

    
      <div className="login-right">

        <form onSubmit={handleLogin} autoComplete="off">

          <h1 className="login-h1">Log in to Smart Shopy</h1> 
          <p className="login-h1">Enter your details below</p><br />

          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
                 autoComplete="new-email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              autoComplete="new-password"
            />
          </div>

          <div className="btn-row">
            <button type="submit" className="btn-submit">
              Log In
            </button> 
 </div> <br />
         

          <p className="log-1">
            Switch account? <Link to="/signup">Signup</Link>
          </p> 

        </form>

      </div>

    </div>
  );
}

export default Login;