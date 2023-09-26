import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAB5dLVUuqptzA0w0YyIXlrqbKHhLwOPok",
    authDomain: "taberu-8bcec.firebaseapp.com",
    projectId: "taberu-8bcec",
    storageBucket: "taberu-8bcec.appspot.com",
    messagingSenderId: "984825847680",
    appId: "1:984825847680:web:bcd2fe418deb15efb26b65"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);