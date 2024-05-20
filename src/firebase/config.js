import firebase from 'firebase/compat/app';
import "firebase/firestore"
import "firebase/compat/storage"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCVh0q-x4cA-BL1N6xSAg-Ux-tQpaZepnc",
    authDomain: "olx-clone-f25a1.firebaseapp.com",
    projectId: "olx-clone-f25a1",
    storageBucket: "olx-clone-f25a1.appspot.com",
    messagingSenderId: "753716180495",
    appId: "1:753716180495:web:8f03cb063bbceb7364d57a",
    measurementId: "G-F9YMBJ6D1V"
  };
  

  export const firebaseApp = firebase.initializeApp(firebaseConfig);
  export const firestore = getFirestore(firebaseApp);
  export const auth = getAuth(firebaseApp)
  export const Storage = firebase.storage()