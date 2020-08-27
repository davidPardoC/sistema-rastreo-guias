import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/functions";

var config = {
  apiKey: "AIzaSyCp11RFVMLs757Wh8wT-KRciRKfKkXU32s",
  authDomain: "rapifas-courier.firebaseapp.com",
  databaseURL: "https://rapifas-courier.firebaseio.com",
  projectId: "rapifas-courier",
  storageBucket: "rapifas-courier.appspot.com",
  messagingSenderId: "559359522662",
  appId: "1:559359522662:web:1b1d2047f235d7882cfaa7",
  measurementId: "G-FJHJ53MEW5",
};

//Inicializar Firebase
const fb = firebase.initializeApp(config);

export const db = fb.firestore();
export const auth = fb.auth();
export const functions = fb.functions();
