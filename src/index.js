// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import FirebaseContext from "./Store/FirebaseContext";
import { auth, firebaseApp} from "./firebase/config";

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{ auth, firebaseApp }}>
      <App />
    </FirebaseContext.Provider>
  </React.StrictMode>
);
