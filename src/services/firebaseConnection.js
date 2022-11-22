
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAtgD6Wq6TqaeeCinSbjaYwfT6s-ZJD7RM",
  authDomain: "devlink-5cbac.firebaseapp.com",
  projectId: "devlink-5cbac",
  storageBucket: "devlink-5cbac.appspot.com",
  messagingSenderId: "516241998309",
  appId: "1:516241998309:web:e3d586dc9e375433c92f0c",
  measurementId: "G-N5GW2JZB60"
};

const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp);

export {db, auth};