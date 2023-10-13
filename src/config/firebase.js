import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyBbHWm0VcQjQFQAarhJck9KdeQ0eMV9V_0",
    authDomain: "healthyplusweb-4d3bf.firebaseapp.com",
    projectId: "healthyplusweb-4d3bf",
    storageBucket: "healthyplusweb-4d3bf.appspot.com",
    messagingSenderId: "17919566188",
    appId: "1:17919566188:web:67c2f67902638e25ea9349",
    measurementId: "G-8BWNM1BK43"
  };
  
  // Initialize Firebase
  const firebase = initializeApp(firebaseConfig);

  export default firebase