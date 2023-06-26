// Este es el punto de entrada de tu aplicacion


import { initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyAdXF_2uQ3kxNBTYIFua1-3HFgdLUoiC6Q",
  authDomain: "social-network-f5b19.firebaseapp.com",
  projectId: "social-network-f5b19",
  storageBucket: "social-network-f5b19.appspot.com",
  messagingSenderId: "201443918698",
  appId: "1:201443918698:web:4fa93e0b8f2a8c3d069b13",
  measurementId: "G-XNLQK083M7"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

