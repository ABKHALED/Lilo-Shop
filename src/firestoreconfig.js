import { getApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// const firebaseConfig = {
//   apiKey: "AIzaSyAEnN6596qTdFn8s--DbjM_nTxkBBOv40Q",
//   authDomain: "first-dddab.firebaseapp.com",
//   projectId: "first-dddab",
//   storageBucket: "first-dddab.appspot.com",
//   messagingSenderId: "863906936015",
//   appId: "1:863906936015:web:67b51d8214f0e50ddc73ba",
// };

const firebaseConfig = {
  apiKey: "AIzaSyCG90hFF-qW1ooWlqKlybmOy7mGExwKfkw",
  authDomain: "khaled-66802.firebaseapp.com",
  projectId: "khaled-66802",
  storageBucket: "khaled-66802.appspot.com",
  messagingSenderId: "63754614909",
  appId: "1:63754614909:web:9d8e44756f9d1bec54d914",
  measurementId: "G-SB0JL5F3J9",
};

const app = getApp.length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
