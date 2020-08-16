import firebase from "./firebase";

export const isAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem("@user"))
  return user.type;
}

export const getUser = () => {
  const user = JSON.parse(localStorage.getItem("@user"))
  return user;
}

export const authLoginEmail = (email, password) => {
  return new Promise((resolve, reject) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function (auth) {
        firebase.firestore().collection("users").where("userUid", "==", auth.user.uid)
          .get().then(function (querySnapshot) {
            let user;
            querySnapshot.forEach(function (doc) {
              user = doc.data();
            });
            resolve({ uid: auth.user.uid, type: user.type })
          })
          .catch(function (error) {
            reject(error)
          });
      }).catch(function (error) {
        reject(error)
      });
  });
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

