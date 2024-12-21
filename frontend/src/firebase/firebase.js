// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8JQVfpVOpmb-c7M-7wvkjRd8Qf1pBjqM",
  authDomain: "se100-af7bc.firebaseapp.com",
  projectId: "se100-af7bc",
  storageBucket: "se100-af7bc.appspot.com",
  messagingSenderId: "464358819305",
  appId: "1:464358819305:web:39d8f0c730192b28ecb778",
  measurementId: "G-1LZYHKS59L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
