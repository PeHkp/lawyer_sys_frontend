
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyB5FmXtxFCPLY1IG9BklR9wRXDOWvzaTU0",
  authDomain: "lawyer-proj.firebaseapp.com",
  projectId: "lawyer-proj",
  storageBucket: "lawyer-proj.appspot.com",
  messagingSenderId: "458160534332",
  appId: "1:458160534332:web:11726ba594f2bc9c432439"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
