import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

/*
    No hay problema con que esta informacion sea publica
    https://firebase.google.com/docs/projects/api-keys#api-keys-for-firebase-are-different
*/
const firebaseConfig = {
  apiKey: "AIzaSyAnwZNA2aR2Dgu68qRdqNK1y68e1J4IH34",
  authDomain: "webpage-36e40.firebaseapp.com",
  projectId: "webpage-36e40",
  storageBucket: "webpage-36e40.appspot.com",
  messagingSenderId: "872942139284",
  appId: "1:872942139284:web:d2852985c2c81f584c0181",
  measurementId: "G-GRRBPZTLVP",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, app };
