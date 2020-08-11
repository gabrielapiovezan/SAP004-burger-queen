import firebase from "./firebase";

export const getDataByStatus = (calback, status) => {
  firebase
    .firestore()
    .collection("orders")
    .orderBy("time", "desc")
    .where("status", "==", status)
    .onSnapshot((querySnapshot) => {
      let itens = [];
      querySnapshot.forEach(function (doc) {
        let item = doc.data();
        item.id = doc.id;
        itens.push(item);
      });
      calback(itens);
    });
};

// export const getData = (calback) => {
//   firebase.firestore().collection("orders")
//     .onSnapshot((querySnapshot) => {
//       let itens = [];
//       querySnapshot.forEach(function (doc) {
//         let item = doc.data();
//         console.log(item)
//         item.id = doc.id;
//         itens.push(item);
//       });
//       calback(itens)
//     })
// }

export const getData = (calendar, calback) => {
  firebase
    .firestore()
    .collection("orders")
    .where(
      "requestDate",
      "<=",
      firebase.firestore.Timestamp.fromDate(
        new Date(
          calendar.getFullYear(),
          calendar.getMonth(),
          calendar.getDate(),
          23,
          59,
          59
        )
      )
    )
    .where("requestDate", ">=", firebase.firestore.Timestamp.fromDate(calendar))
    .onSnapshot((querySnapshot) => {
      let itens = [];
      querySnapshot.forEach(function (doc) {
        let item = doc.data();
        item.id = doc.id;
        itens.push(item);
      });
      calback(itens);
    });
};
export const updateData = (id, data) => {
  firebase.firestore().collection("orders").doc(id).update(data);
};

export const notifyHall = (calback) => {
  firebase
    .firestore()
    .collection("orders")
    .where(
      "dateDelivery",
      ">",
      firebase.firestore.Timestamp.fromDate(new Date())
    )
    .orderBy("dateDelivery", "desc")
    .limit(1)
    .onSnapshot((querySnapshot) => {
      let item;
      querySnapshot.forEach(function (doc) {
        item = doc.data();
        item.id = doc.id;
      });
      calback(item);
    });
};
