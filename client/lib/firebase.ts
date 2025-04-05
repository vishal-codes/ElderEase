// lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyCht0wYC-gYG6HnDPd1z4rZAd-mqHqiJIM",
    authDomain: "wireframe-to-code-97d60.firebaseapp.com",
    projectId: "wireframe-to-code-97d60",
    storageBucket: "wireframe-to-code-97d60.appspot.com",
    messagingSenderId: "810375918262",
    appId: "1:810375918262:web:57685b99e9de768aae6c17",
    measurementId: "G-16Q1SZZ6K9"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
// const db = initializeFirestore(app, {
//     experimentalForceLongPolling: true,
//     // useFetchStreams: false,
//     localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
//   });

export { app, auth };

