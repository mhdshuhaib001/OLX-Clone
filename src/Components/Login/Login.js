import "./Login.css";
import Logo from "../../olx-logo.png";
import React, { useState, useContext } from 'react';
import FirebaseContext from '../../Store/FirebaseContext';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";


function Login() {

  const {firebase} = useContext(FirebaseContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth,email,password).then(()=>{
      navigate('/')
    }).catch((error)=>{
      console.log(error)
    })
  };
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form>
          <label htmlFor="fname">Email</label>
          <br />
          <input className="input" type="email" id="fname" name="email" />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
