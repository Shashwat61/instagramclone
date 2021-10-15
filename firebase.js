// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVHmgIhRDvaxsNF3B8rU3D9Zu2cgPKBHg",
  authDomain: "instagram-770d3.firebaseapp.com",
  projectId: "instagram-770d3",
  storageBucket: "instagram-770d3.appspot.com",
  messagingSenderId: "1038074225664",
  appId: "1:1038074225664:web:865bdccb3fe76121d9a4e5"
};

// Initialize Firebase
const app =!getApps().length ?  initializeApp(firebaseConfig) : getApp();
const db=getFirestore();
const storage=getStorage()

export {app,db,storage}