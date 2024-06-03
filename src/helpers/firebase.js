import {initializeApp} from 'firebase/app';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore/lite';
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  PRIVATE_KEY,
} from '@env';
import CryptoJS from 'crypto-js';
import {store} from './Redux/store';

const firebaseConfig = FIREBASE_API_KEY
  ? {
      apiKey: FIREBASE_API_KEY,
      authDomain: FIREBASE_AUTH_DOMAIN,
      projectId: FIREBASE_PROJECT_ID,
      storageBucket: FIREBASE_STORAGE_BUCKET,
      messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
      appId: FIREBASE_APP_ID,
    }
  : null;

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const addUserData = async (userId, data) => {
  const finalUserId = await getUserId(userId);
  const result = await addDoc(collection(db, finalUserId), {
    mainTask: {...data, status: false},
    subTasks: [],
  });
  return result.id;
};

export const getAllDocuments = async userId => {
  const finalUserId = await getUserId(userId);
  return await getDocs(collection(db, finalUserId));
};

export const getSpecificDocument = async (userId, documentId) => {
  const finalUserId = await getUserId(userId);
  const docRef = doc(db, finalUserId, documentId);
  const docData = await getDoc(docRef);
  return docData.data();
};

export const updateDocuments = async (userId, documentId, data) => {
  const finalUserId = await getUserId(userId);
  const documentRef = doc(db, finalUserId, documentId);
  await updateDoc(documentRef, data);
};

export const deleteDocument = async (userId, documentId) => {
  const finalUserId = await getUserId(userId);
  await deleteDoc(doc(db, finalUserId, documentId));
};

const getUserId = async userId => {
  let finalUserId = userId;
  const {isDeviceId} = store.getState().main;
  if (isDeviceId) {
    finalUserId = await CryptoJS.HmacSHA256(userId, PRIVATE_KEY).toString();
  }
  return finalUserId;
};

export default app;
