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

export async function existUsername(username){
    const users = [];
    const docsRef = collection(db, 'users')
    const q = query(docsRef, where('username', '==', username));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
        users.push(doc.data());
    });

    return users.length > 0 ? users[0].uid : null;
}

export async function registerNewUser(user){
    try{
        const collectionRef = collection(db, "users");
        const docRef = doc(collectionRef, user.uid);
        await setDoc(docRef, user);
    }catch(error){

    }
}

export async function updateUser(user){
    try{
        const collectionRef = collection(db, "users");
        const docRef = doc(collectionRef, user.uid);
        await setDoc(docRef, user);
    }catch(error){

    }
}

export async function getUserInfo(uid){
    try{
        const docRef = doc(db, 'users', uid);
        const document = await getDoc(docRef);
        return document.data();
    }catch(error){

    }
}

export async function insertNewMenu(menu){
    try {
        const docRef = collection(db, 'menus');
        const res = await addDoc(docRef, menu);
        return res;
    }catch(error){
        console.error(error);
    }
}

export async function getMenus(uid){
    const menus = [];
    try{
        const collectionRef = collection(db, 'menus');
        const q = query(collectionRef, where('uid', '==', uid));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(doc => {
            const menu = { ...doc.data() };
            menu.docId = doc.id;
            menus.push(menu);
        });

        return menus;

    }catch (error){
        console.error(error);
    }
}

export async function updateMenu(docId, menu){
    try {
        const docRef = doc(db, 'menus', docId);
        const res = await setDoc(docRef, menu);
        return res;
    } catch(error){
        console.error(error);
    }
}


export async function deleteMenu(docId){
    try{
        const docRef = doc(db, 'menus', docId);
        const res = await deleteDoc(docRef);
        
        return res;
    
    } catch (error) {
        console.error(error)
    }
}