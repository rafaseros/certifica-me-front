import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyCkpuMsBJX8Ider9o6KHoup8uP3vEBRd3k',
	authDomain: 'certificame-utils.firebaseapp.com',
	projectId: 'certificame-utils',
	storageBucket: 'certificame-utils.appspot.com',
	messagingSenderId: '83387960543',
	appId: '1:83387960543:web:d169ac62f28d011249ed6a',
	measurementId: 'G-5M2KJZ0QJN'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage();

export { auth, provider, db, storage };
