import firebase from "./firebase";

export const isAuthenticated = () => false;

export const authLoginEmail = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
};

export const authRegister = async (user) => {
  const responseAuth = await firebase
    .auth()
    .createUserWithEmailAndPassword(user.email, user.password);

  await firebase.auth().currentUser.updateProfile({
    displayName: user.name,
  });

  await firebase.firestore().collection('users').add({ type: user.type, userUid: responseAuth.user.uid });

  return responseAuth;

};

