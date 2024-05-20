import "./Login.css";
import Logo from "../../olx-logo.png";
import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../Store/FirebaseContext';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function Login() {
  const { firebase } = useContext(FirebaseContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email and password are required"); 
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("Logged in");
        navigate('/');
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
        if (error.code === "auth/user-not-found") {
          toast.error("User not found");
        } else if (error.code === "auth/wrong-password") {
          toast.error("Wrong password");
        } else {
          toast.error("Authentication failed");
        }
      });
  };

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt="OLX Logo" />
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <br />
          <button type="submit">Login</button>
        </form>
        <a href="/signup">Signup</a>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
