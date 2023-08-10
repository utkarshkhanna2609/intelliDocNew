import{ createError,  ERROR_CODES } from './common/customError';

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc,getDocs, updateDoc, deleteDoc, onSnapshot, collection, addDoc } from 'firebase/firestore';
import { getFirebaseConfig } from './firebase-config';

import { getSession } from 'next-auth/react';

// Initialize Firebase
const firebaseConfig = getFirebaseConfig();
const app =  initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
let isInitialized = false;

// Function to authenticate Firebase operations with the session token
async function authenticateWithToken(token) {
  try {
    await signInWithCustomToken(auth, token);
  } catch (error) {
    throw createError(ERROR_CODES.FIREBASE_AUTHENTICATION_FAILED, 'Firebase authentication failed', error, 'high');
  }
}

export async function initFirebaseClientManager() {
  if(isInitialized === true ){
    console.log("fb manager is already initilized");
    return ;
  }
  try {
    const session = await getSession();
    const accessToken = session.accessToken;
    console.log('client side firebase manager - initFirebase --- session',isInitialized + '  token   '+ accessToken);

    await authenticateWithToken(accessToken);
    isInitialized = true;
    console.log("initFirebaseClientManager  done",isInitialized );
  } catch (error) {
    isInitialized = false ;
    throw createError(ERROR_CODES.FIREBASE_AUTHENTICATION_FAILED, 'Error initializing Firebase client', error, 'high');
  }
}

// Function to get a document from Firestore
export async function getDocument(collectionName, docId) {
  try {
    const documentRef = doc(db, collectionName, docId);
    const documentSnap = await getDoc(documentRef);

    if (documentSnap.exists()) {
      return documentSnap.data();
    } else {
      throw createError(ERROR_CODES.FIREBASE_READ_FAILED, 'Document not found', {}, 'low');
    }
  } catch (error) {
    throw createError(ERROR_CODES.FIREBASE_READ_FAILED, 'Error getting document', error, 'high');
  }
}

// Function to update a document in Firestore
export async function updateDocument(collectionName, docId, newData) {
  try {
    const documentRef = doc(db, collectionName, docId);
    await updateDoc(documentRef, newData);
    return true;
  } catch (error) {
    throw createError(ERROR_CODES.FIREBASE_WRITE_FAILED, 'Error updating document', error, 'high');
  }
}

// Function to delete a document from Firestore
export async function deleteDocument(collectionName, docId) {
  try {
    const documentRef = doc(db, collectionName, docId);
    await deleteDoc(documentRef);
    return true;
  } catch (error) {
    throw createError(ERROR_CODES.FIREBASE_WRITE_FAILED, 'Error deleting document', error, 'high');
  }
}

// Function to add or create a document in Firestore
export async function addOrCreateDocument(collectionName, data) {
  try {
    
    const collectionRef = collection(db, collectionName);
    const newDocRef = await addDoc(collectionRef, data);
    return newDocRef.id;
  } catch (error) {
    throw createError(ERROR_CODES.FIREBASE_WRITE_FAILED, 'Error adding or creating document', error, 'high');
  }
}

// Function to listen to real-time updates on a Firestore collection
export function listenToCollection(collectionName, callback) {
  try {
    const collectionRef = collection(db, collectionName);
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const documents = [];
      snapshot.forEach((doc) => {
        documents.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      callback(documents);
    });

    return unsubscribe;
  } catch (error) {
    throw createError(ERROR_CODES.FIREBASE_READ_FAILED, 'Error listening to collection', error, 'high');
  }
}

export async function setupAuthStateObserver() {
  onAuthStateChanged(auth, async (user) => {
    const session = await getSession();

    if (user) {
      console.log('setupAuthStateObserver        User signed in:', user);
      if (!session) {
        console.log('setupAuthStateObserver        User signed in but session is null:', user);
        await cleanupFirebaseManager();
      }
    } else {
      console.log('setupAuthStateObserver            User signed out');
    }
  });
}

export async function cleanupFirebaseManager() {
  console.log('---------------cleanupFirebaseManager----');

  try {
    await auth.signOut();
    console.log('User signed out from Firebase');
  } catch (error) {
    throw createError(ERROR_CODES.FIREBASE_AUTHENTICATION_FAILED, 'Error signing out from Firebase', error, 'high');
  }
}

// Function to get all documents from a Firestore collection
export async function getAllDocuments(collectionName) {
  try {
    console.log("firebase manager getAllDocuments ", collectionName);
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents = querySnapshot.docs.map((doc) => doc.data());
    return documents;
  } catch (error) {
    console.log("fb-manager getall docs",error );
    throw createError(
      ERROR_CODES.FIREBASE_READ_FAILED,
      'Error getting all documents',
      error,
      'high'
    );
  }
}

setupAuthStateObserver();

/*
export {
  initFirebaseClientManager,
  getDocument,
  updateDocument,
  deleteDocument,
  listenToCollection,
  addOrCreateDocument,
  cleanupFirebaseManager,
}; 
*/
