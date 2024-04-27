import { initializeApp } from 'firebase/app';

const config = {
  apiKey: "AIzaSyAaJsJcAooU49HPSSzgE5eUXtoxsXpOo70",
  authDomain: "medicall-farma.firebaseapp.com",
  databaseURL: "https://medicall-farma-default-rtdb.firebaseio.com",
  projectId: "medicall-farma",
  storageBucket: "medicall-farma.appspot.com",
  messagingSenderId: "560615912268",
  appId: "1:560615912268:web:1cf85af05418c3e91895e9"
}

export const app = initializeApp(config)