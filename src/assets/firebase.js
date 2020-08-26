import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

var  config = {
    apiKey: "AIzaSyAxHhKumfecDwufxvGeb86UmpUG1Ti41hc",
    authDomain: "sistema-gestion-guias.firebaseapp.com",
    databaseURL: "https://sistema-gestion-guias.firebaseio.com",
    projectId: "sistema-gestion-guias",
    storageBucket: "sistema-gestion-guias.appspot.com",
    messagingSenderId: "149539782735",
    appId: "1:149539782735:web:88dc0f2d3b9cbede66ea3a",
    measurementId: "G-39LJQJHGBN"
  };

  //Inicializar Firebase
  const fb = firebase.initializeApp(config);

  export const   db = fb.firestore();
  export const auth = fb.auth();
