import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

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

        navigate("/");

      } 
      else 
        {

        if (product)
           {
          navigate("/cart", { state: product });
        }
         else
           {
          navigate("/");
        }

      }

      setEmail("");
      setPassword("");

    } 
    else {

      alert("Invalid Email or Password");

    }

  }

  return (
    <>
      <form className="login" onSubmit={handleLogin} >

        <h2>Login</h2>

        <div>

          <label>Email address</label>

          <input type="email" value={email} autoComplete="off" onChange={(e) => setEmail(e.target.value)} className="form-input" />

        </div>

        <div>

          <label>Password</label>
          <input type="password" value={password} autoComplete="new-password"onChange={(e) =>setPassword(e.target.value)} className="form-input"
          />

        </div>

        <button type="submit" className="btn-submit" >Login</button>

        <p className="log1"> Switch account?<Link to="/signup">Signup</Link> </p>

      </form>
    </>
  );

}

export default Login;