import firebase from "./firebase";

export const isAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem("@user"))

  return user.type;
}

export const getUser = () => {
  const user = JSON.parse(localStorage.getItem("@user"))
  return user;
}

export const authLoginEmail = async (email, password) => {
  const auth = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)

  const user = await firebase.firestore().collection('users')

  return { uid: auth.user.uid, type: "service" }
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

