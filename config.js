import firebase from 'firebase';
require('@firebase/firestore');

var firebaseConfig = {
  apiKey: "AIzaSyDhr74Qfz9FyXMUHiW7mKLVb5Ar-wBhfjo",
  authDomain: "goalplanner-f23c2.firebaseapp.com",
  projectId: "goalplanner-f23c2",
  storageBucket: "goalplanner-f23c2.appspot.com",
  messagingSenderId: "803389234334",
  appId: "1:803389234334:web:b0c09631999c7d278baf8f",
  measurementId: "G-L7PL13T5WY"
};

  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();