// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBs3SyBBvyiJ4riFUOQVrVL1wNCCiHsXE",
  authDomain: "share-bite-app.firebaseapp.com",
  projectId: "share-bite-app",
  storageBucket: "share-bite-app.firebasestorage.app",
  messagingSenderId: "924997972416",
  appId: "1:924997972416:web:501f2ef27ff8b404151825"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;