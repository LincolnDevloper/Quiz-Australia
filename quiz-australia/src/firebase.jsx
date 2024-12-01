// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics, logEvent} from "firebase/analytics";

// Substitua pelas suas credenciais fornecidas pelo Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDpauZFdLUiRQBMDoGaSyo-2mZfN1H3bLE",
  authDomain: "quiz-australia.firebaseapp.com",
  databaseURL: "https://quiz-australia-default-rtdb.firebaseio.com",
  projectId: "quiz-australia",
  storageBucket: "quiz-australia.firebasestorage.app",
  messagingSenderId: "382817905141",
  appId: "1:382817905141:web:fcf3971a4bc5da57a318bc",
  measurementId: "G-RLBZJZZSYT"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Analytics depois que o app for inicializado
const analytics = getAnalytics(app);

// Exporta o banco de dados e o logEvent para serem usados no projeto
export const database = getDatabase(app);
export { analytics, logEvent };
