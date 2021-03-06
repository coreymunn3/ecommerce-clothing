import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBJwBMWSQ5R726_PClRgaYZat4JpO0W7eM",
  authDomain: "crwn-db-55e32.firebaseapp.com",
  databaseURL: "https://crwn-db-55e32.firebaseio.com",
  projectId: "crwn-db-55e32",
  storageBucket: "crwn-db-55e32.appspot.com",
  messagingSenderId: "1074886267131",
  appId: "1:1074886267131:web:1035699606e99a35f3205e"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  // if userAuth does exist, query firestore for user data
  // get reference at location of user reference to uid passed in
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  // get snapshot using reference, use 'exists' to determine if this user is in our database.
  const snapShot = await userRef.get()
  // if doesn't exist, create a new user
  if(!snapShot.exists){
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName, email, createdAt, ...additionalData
      });
    }
    catch(err) {
      console.log('error creating user', err.message);
    }
  }
  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
// always trigger the google popup whenever we use the google auth provider for authenticaiton
provider.setCustomParameters({'prompt': 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;