import firebase from "./firebase";

export const getDataByStatus = (calback, status) => {
  firebase
    .firestore()
    .collection("orders")
    .orderBy("requestDate", "desc")
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

export const getDataAll = (calback) => {
  firebase
    .firestore()
    .collection("orders")
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

export const getData = (calendarStart, calendarFinish, status, calback) => {
  let filter;

  if (status === null) {
    filter = firebase
      .firestore()
      .collection("orders")
      .orderBy("requestDate", "desc")
      .where(
        "requestDate",
        "<=",
        firebase.firestore.Timestamp.fromDate(
          new Date(
            calendarFinish.getFullYear(),
            calendarFinish.getMonth(),
            calendarFinish.getDate(),
            23,
            59,
            59
          )
        )
      )
      .where(
        "requestDate",
        ">=",
        firebase.firestore.Timestamp.fromDate(
          new Date(
            calendarStart.getFullYear(),
            calendarStart.getMonth(),
            calendarStart.getDate()
          )
        )
      );
  } else {
    filter = firebase
      .firestore()
      .collection("orders")
      .orderBy("requestDate", "desc")
      .where(
        "requestDate",
        "<=",
        firebase.firestore.Timestamp.fromDate(
          new Date(
            calendarFinish.getFullYear(),
            calendarFinish.getMonth(),
            calendarFinish.getDate(),
            23,
            59,
            59
          )
        )
      )
      .where(
        "requestDate",
        ">=",
        firebase.firestore.Timestamp.fromDate(
          new Date(
            calendarStart.getFullYear(),
            calendarStart.getMonth(),
            calendarStart.getDate()
          )
        )
      )
      .where("status", "==", status);
  }

  filter.onSnapshot((querySnapshot) => {
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
