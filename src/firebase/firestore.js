// firestore documentation: https://softauthor.com/add-firebase-to-javascript-web-app/;
import app from "./index";
import {
  getFirestore,
  // connectFirestoreEmulator,
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  deleteField,
  deleteDoc,
  getDoc,
  setDoc,
  // query,
  // where,
} from "firebase/firestore";

const firestore = getFirestore(app);
// connectFirestoreEmulator(firestore, "localhost", 8080);

export default {};

export const getCollection = async (collectionName) => {
  return (await getDocs(collection(firestore, collectionName))).docs;
};

export const getCollectionEntry = async (collectionName, entryName) => {
  try {
    const docSnap = await getDoc(doc(firestore, collectionName, entryName));
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (e) {
    throw e;
  }
};

export const updateCollectionEntry = async (
  collectionName,
  entryName,
  data = {}
) => {
  return await updateDoc(doc(firestore, collectionName, entryName), data);
};

export const createCollectionEntry = async (
  collectionName,
  data,
  entryName = "choose custom entry name"
) => {
  if (entryName.match("choose custom entry name")) {
    return await addDoc(collection(firestore, collectionName), data);
  }
  return await setDoc(doc(firestore, collectionName, entryName), data);
};

export const deleteCollectionEntryFields = async (
  collectionName,
  entryName,
  fieldNames = []
) => {
  const data = {};
  fieldNames.forEach((name) => (data[name] = deleteField()));
  return await updateDoc(doc(firestore, collectionName, entryName), data);
};

export const deleteCollectionEntry = async (collectionName, entryName) => {
  return await deleteDoc(doc(firestore, collectionName, entryName));
};
