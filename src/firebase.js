import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDOZ1RZ6o6fR8xQfeMZscV-yDpJ3ACdwJI",
  authDomain: "elkbusinesshub.firebaseapp.com",
  databaseURL: "https://elkbusinesshub-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "elkbusinesshub",
  storageBucket: "elkbusinesshub.appspot.com",
  messagingSenderId: "244262150078",
  appId: "1:244262150078:web:b0a07bb9fa42efd96923ef",
  measurementId: "G-PSPDTDY8N7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Initialize Firestore
const db = getFirestore(app);

export { db, auth, provider, signInWithPopup };
