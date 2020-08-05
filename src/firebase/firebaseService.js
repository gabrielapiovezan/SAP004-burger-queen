import firebase from "./firebase";

export const getDataByStatus = (calback, status) => {
  firebase.firestore().collection("orders").where("status", "==", status)
    .onSnapshot((querySnapshot) => {
      let itens = [];
      querySnapshot.forEach(function (doc) {
        let item = doc.data();
        item.id = doc.id;
        itens.push(item);
      });
      calback(itens)
    })
}

export const getData = (calback) => {
  firebase.firestore().collection("orders")
    .onSnapshot((querySnapshot) => {
      let itens = [];
      querySnapshot.forEach(function (doc) {
        let item = doc.data();
        console.log(item)
        item.id = doc.id;
        itens.push(item);
      });
      calback(itens)
    })
}

export const updateData = (id, data) => {
  firebase.firestore().collection('orders').doc(id).update(data);
};


