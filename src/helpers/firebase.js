import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
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
} from '@env';

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

export const auth = getAuth();

export const addUserData = async (userId, data) => {
  const result = await addDoc(collection(db, userId), {
    mainTask: {...data, status: false},
    subTasks: [],
  });
  return result.id;
};

export const getAllDocuments = async userId => {
  return await getDocs(collection(db, userId));
};

export const getSpecificDocument = async (userId, documentId) => {
  const docRef = doc(db, userId, documentId);
  const docData = await getDoc(docRef);
  return docData.data();
};

export const updateDocuments = async (userId, documentId, data) => {
  const documentRef = doc(db, userId, documentId);
  await updateDoc(documentRef, data);
};

export const deleteDocument = async (userId, documentId) => {
  await deleteDoc(doc(db, userId, documentId));
};

export default app;
