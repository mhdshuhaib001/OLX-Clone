import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Context from './Store/FirebaseContext'
import { FirebaseContext } from './Store/FirebaseContext';
import { auth, firebaseApp } from './firebase/config';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{ auth, firebaseApp }}>
      <Context>
      <App />
      </Context>
    </FirebaseContext.Provider>
  </React.StrictMode>
);
