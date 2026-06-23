import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyB_D_9D7xIGfvO6IMG9UGGX0QnRhkkORqE",
  authDomain: "gastrobook-f0a02.firebaseapp.com",
  databaseURL: "https://gastrobook-f0a02-default-rtdb.firebaseio.com",
  projectId: "gastrobook-f0a02",
  storageBucket: "gastrobook-f0a02.firebasestorage.app",
  messagingSenderId: "50497272195",
  appId: "1:50497272195:web:a64eb42de990261a46deb6",
  measurementId: "G-FS6RDN4SWS"
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export {
  auth,
  db
};