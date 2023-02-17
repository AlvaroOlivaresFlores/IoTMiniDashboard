import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// const firebaseConfig = {
//   apiKey: "AIzaSyDU20uJbF7MaYrm12gcqWkyYKFSksOVXTw",
//   authDomain: "server-0print3d.firebaseapp.com",
//   projectId: "server-0print3d",
//   storageBucket: "server-0print3d.appspot.com",
//   messagingSenderId: "1069081202703",
//   appId: "1:1069081202703:web:fb254e2b601ccc308c537a",
//   measurementId: "G-645N6BYB1K",
// };

const firebaseConfig = {
  apiKey: "AIzaSyCN-YRpu0atZ1my2csGD0lhYvc1ziv7jcA",
  authDomain: "cotizadores-0ohm.firebaseapp.com",
  projectId: "cotizadores-0ohm",
  storageBucket: "cotizadores-0ohm.appspot.com",
  messagingSenderId: "564872138132",
  appId: "1:564872138132:web:0b927c1e05ca46b6049381",
  measurementId: "G-TSXXFX67C6",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
