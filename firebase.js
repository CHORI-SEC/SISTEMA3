import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBY8Ekm5id9v1xX3_xkFDjaQ9B8cUhpaF8",
  authDomain: "sistemadetomadepedidos.firebaseapp.com",
  projectId: "sistemadetomadepedidos",
  storageBucket: "sistemadetomadepedidos.firebasestorage.app",
  messagingSenderId: "959096355892",
  appId: "1:959096355892:web:d17d4e02390334867bde61",
  measurementId: "G-5YWCZXXTSW"
}; // ← ESTO FALTABA

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
