import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions'
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyBqx7BfGCzpP9249-YbNb3m72UPqNkrFgE",
    authDomain: "tienghanthaytu2024.firebaseapp.com",
    projectId: "tienghanthaytu2024",
    storageBucket: "tienghanthaytu2024.appspot.com",
    messagingSenderId: "420270703257",
    appId: "1:420270703257:web:62afb7c6c168f37da36e08",
    measurementId: "G-8EYHEBHFJY"
  };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

const storage = firebase.storage();
const functions = firebase.functions();
const auth = firebase.auth();
const db = firebase.firestore();


export {
    storage,
    functions,
    firebase as default
}
