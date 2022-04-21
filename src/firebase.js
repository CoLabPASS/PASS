// firebase.js
import { initializeApp } from 'firebase/app';

// Initialize Firebase
// *** USE YOUR CONFIG OBJECT ***
const firebaseConfig = {
    apiKey: "AIzaSyAS2AQO_30l7ry2v0dQI-bGtw49i-QGc50",
    authDomain: "ijournal-8b063.firebaseapp.com",
    projectId: "ijournal-8b063",
    storageBucket: "ijournal-8b063.appspot.com",
    messagingSenderId: "20935404961",
    appId: "1:20935404961:web:735713c840545ed1e46fe0"
  };

// setting a variable that initializes our application
const firebase = initializeApp(firebaseConfig);
// this exports the CONFIGURED version of firebase
export default firebase;