// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBT3xgCdgYoUYWHnVj1AnbWy3_SOZiUvys',
  authDomain: 'to-do-list-e2a37.firebaseapp.com',
  projectId: 'to-do-list-e2a37',
  storageBucket: 'to-do-list-e2a37.appspot.com',
  messagingSenderId: '206358385320',
  appId: '1:206358385320:web:c6e27861430f136779e89d',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export default app;
