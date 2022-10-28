import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAsnZCxSvTlVXOtgbGDxo3iXPZB6JKOGQM",
  authDomain: "x63problems.firebaseapp.com",
  projectId: "x63problems",
  storageBucket: "x63problems.appspot.com",
  messagingSenderId: "423200793479",
  appId: "1:423200793479:web:b2e56d59ebb47e191ea922"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const AUDIENCE_COLLECTION = "audience";

export const storeEmail = async (email) => {
  await addDoc(collection(db, AUDIENCE_COLLECTION), {email});
}