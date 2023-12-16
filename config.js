// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDcrJa82G4JTQRSangUh9DL60ZE7uCqEaw",
    authDomain: "acme-fashion-app-react-native.firebaseapp.com",
    projectId: "acme-fashion-app-react-native",
    storageBucket: "acme-fashion-app-react-native.appspot.com",
    messagingSenderId: "883473409793",
    appId: "1:883473409793:web:f849cba6173da71c65dd00",
    measurementId: "G-RJMNQ8DRLQ"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}
export { firebase }
//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);