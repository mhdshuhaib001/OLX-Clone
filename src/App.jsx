import React , {useEffect,useContext} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SignUp from "./Pages/Signup"
import Login from './Pages/Login'
import { AuthContext } from './Store/FirebaseContext';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase/config'; 

import Home from './Pages/Home';

function App() {
  const { setUser} = useContext(AuthContext)

  useEffect (()=>{
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  })
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </Router>
  );
}

export default App;
