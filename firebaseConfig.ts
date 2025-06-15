// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDz-jsAecgZObTTiovAnBdlzgshOthnqEQ",
    authDomain: "smartlifereminder.firebaseapp.com",
    projectId: "smartlifereminder",
    storageBucket: "smartlifereminder.appspot.com", // ✅ fixed here
    messagingSenderId: "641909956792",
    appId: "1:641909956792:web:07450264c48e401e1c544d",
    measurementId: "G-RKDXXV8CSM"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
