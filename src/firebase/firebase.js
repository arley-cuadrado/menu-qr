import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { 
    getStorage, 
    ref, uploadBytes, 
    getDownloadURL, 
    getBytes, 
} from "firebase/storage";
import { 
    getFirestore,
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    query,
    where,
    setDoc,
    deleteDoc,
 } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
//const analytics = getAnalytics(app);

export async function userExists( uid ) {
    const docRef = doc(db, 'users', uid);
    const res = await getDoc(docRef);

    console.log(res)
    return res.exists();
}