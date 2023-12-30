import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'; 

const firebaseConfig = {
  apiKey: "AIzaSyC5L3rmzqwMZGjB8c_n2-wvATHAcpeTmE0",
  authDomain: "to-do-application-41382.firebaseapp.com",
  projectId: "to-do-application-41382",
  storageBucket: "to-do-application-41382.appspot.com",
  messagingSenderId: "1039221566119",
  appId: "1:1039221566119:web:9b41ca96f042daf1a64982",
  measurementId: "G-0GGV1HVKMC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth(app);
export default auth;