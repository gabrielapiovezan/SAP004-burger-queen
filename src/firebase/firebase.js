import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBFli80V_odJqMDCSWZpdTeQPhzSKWhPMY",
  authDomain: "burgerqueen-004.firebaseapp.com",
  databaseURL: "https://burgerqueen-004.firebaseio.com",
  projectId: "burgerqueen-004",
  storageBucket: "burgerqueen-004.appspot.com",
  messagingSenderId: "638663872976",
  appId: "1:638663872976:web:4058b166159a183fc1a9d5",
  measurementId: "G-N89TRS9S1Z"
};

firebase.initializeApp(firebaseConfig);
export default firebase;


// class Firebase {
//   constructor() {
//     firebase.initializeApp(firebaseConfig);
//   }
// }

// export default Firebase;