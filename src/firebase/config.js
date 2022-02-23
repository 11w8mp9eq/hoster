import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDoWli-JBDjs2o7_wc7Xf0EFScomzM-vE0",
    authDomain: "hoster-4ddb1.firebaseapp.com",
    projectId: "hoster-4ddb1",
    storageBucket: "hoster-4ddb1.appspot.com",
    messagingSenderId: "216539203490",
    appId: "1:216539203490:web:bfe31774152ac79d60d4fb"
  };

  // init firebase
  firebase.initializeApp(firebaseConfig)

  // init services
  const projectFirestore = firebase.firestore()
  const projectAuth = firebase.auth()
  const projectStorage = firebase.storage()

  // timestamp
  const timestamp = firebase.firestore.FieldValue.serverTimestamp

  export { projectFirestore, projectAuth, timestamp, projectStorage }