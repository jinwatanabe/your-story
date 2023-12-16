import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyA5_tcXN0saAawGWzNmPVQX712sPXIb9gY",
  authDomain: "your-gola-story.firebaseapp.com",
  projectId: "your-gola-story",
  storageBucket: "your-gola-story.appspot.com",
  messagingSenderId: "1090119656445",
  appId: "1:1090119656445:web:cf682fec064a6b138c6f94",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
