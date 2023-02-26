import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBFCqeJRUJa6dK8jpywTv-4DPbsT3-P4Qo",
  authDomain: "beta-instagram.firebaseapp.com",
  projectId: "beta-instagram",
  storageBucket: "beta-instagram.appspot.com",
  messagingSenderId: "417698098359",
  appId: "1:417698098359:web:dbd41cf327fcc4613c7132",
  measurementId: "G-1S8HZ6B6BH",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
