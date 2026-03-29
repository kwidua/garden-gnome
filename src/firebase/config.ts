
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuMPFO73RwfxW3hY2sjpJT-zMHuCQBvUw",
  authDomain: "garden-gnome-bab05.firebaseapp.com",
  projectId: "garden-gnome-bab05",
  storageBucket: "garden-gnome-bab05.firebasestorage.app",
  messagingSenderId: "995454841160",
  appId: "1:995454841160:web:8c4bf214b4aa0be0ae437d",
  measurementId: "G-TY6NHZTZ61"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app);
export default app;

//const analytics = getAnalytics(app);