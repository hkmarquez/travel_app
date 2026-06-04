import { initializeApp, getApps } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyBTUHB5TBnZgIG753ob-E3Jlq-vEwyWSR0",
  authDomain: "ottera-3c093.firebaseapp.com",
  projectId: "ottera-3c093",
  storageBucket: "oterra-3c093.appspot.com",
  messagingSenderId: "361327212421",
  appId: "1:361327212421:web:0690b431c12aa587b776ec",
  measurementId: "G-STPMCGQLEM"
};

const app = getApps().length === 0 ? initializeApp(config) : getApps()[0];

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db = getFirestore(app);

console.log('Firebase apps:', getApps().length);
console.log('Auth object:', auth);