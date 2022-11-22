
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "SuaAPIkey",
  authDomain: "AUTHDOMAINLINK",
  projectId: "IDPROJECT",
  storageBucket: "SEUBUCKET",
  messagingSenderId: "SENDERID",
  appId: "IDGERAL",
  measurementId: "ID"
};

const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp);

export {db, auth};
