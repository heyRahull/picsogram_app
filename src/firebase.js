import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBQ2mon7hO95wCVvCHIvb4WOTkVlKwqsV8",
  authDomain: "instagram-clone-f5d3a.firebaseapp.com",
  projectId: "instagram-clone-f5d3a",
  storageBucket: "instagram-clone-f5d3a.appspot.com",
  messagingSenderId: "499716369402",
  appId: "1:499716369402:web:ad08f4650d20c0cbeb9243"
})

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage =  firebase.storage();

export { db, auth, storage };