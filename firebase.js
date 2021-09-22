import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyB0CbpDXuspX7aGG6J6yNn5c-0V86u2D20",
  authDomain: "whatsapp-clone-e752a.firebaseapp.com",
  projectId: "whatsapp-clone-e752a",
  storageBucket: "whatsapp-clone-e752a.appspot.com",
  messagingSenderId: "62495821702",
  appId: "1:62495821702:web:59fa406ea2c4141888e607"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
const auth = app.auth()
const db = app.firestore()
const provider = new firebase.auth.GoogleAuthProvider()
const storage = app.storage()

export {auth, db, provider, storage}