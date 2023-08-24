import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDXNiCDZhf1qRqIN4kRqNq3auDWAXnmDVs",
  authDomain: "flixxit-d329f.firebaseapp.com",
  projectId: "flixxit-d329f",
  storageBucket: "flixxit-d329f.appspot.com",
  messagingSenderId: "183408274700",
  appId: "1:183408274700:web:7cf5044fd35baf396eed29",
  measurementId: "G-FGXNQQBCEG",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;
