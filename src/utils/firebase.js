// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwL4tql6yw5Og7eBZY7533z1NJiAZamBs",
  authDomain: "netflixgpt-4d316.firebaseapp.com",
  projectId: "netflixgpt-4d316",
  storageBucket: "netflixgpt-4d316.appspot.com",
  messagingSenderId: "913170689608",
  appId: "1:913170689608:web:19fedd2621781521bf727d",
  measurementId: "G-F3B2V1TMH4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();