import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBOOg3Yk4rdmYpGSd21wwSwI55iD2mDDhs",
  authDomain: "blogging-application-c31ab.firebaseapp.com",
  projectId: "blogging-application-c31ab",
  storageBucket: "blogging-application-c31ab.appspot.com",
  messagingSenderId: "510749169324",
  appId: "1:510749169324:web:7e0a44bc8e6c073f1b3109",
  measurementId: "G-F7Z0H65XFP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, analytics };
