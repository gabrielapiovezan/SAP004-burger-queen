import React, { useState, useEffect } from "react";
import firebase from "../../firebase/firebase";
import { getData, getDataAll } from "../../firebase/firebaseService";
import Tempo from "../../img/tempo.png";
import "./style.css";

const Command = (props) => {
  const [averageTime, setAverageTime] = useState([]);
  console.log(props.request.requestDate);
  useEffect(() => {
    getDataAll(time);
  }, []);

  const time = (itens) => {
    const array = itens.filter((a) => a.dateDelivery);
    if (array.length) {
      const average =
        array.reduce((accum, curr) => {
          return (
            accum +
            curr.dateDelivery.toDate().getTime() -
            curr.requestDate.toDate().getTime()
          );
        }, 0) / array.length;

      // const hours = parseInt(average / 3600000);
      // const min = parseInt((average % 3600000) / 60000);
      setAverageTime(transformTime(average));
    }
  };

  const dateAndHour = (date) => {
    if (!date) {
      return "";
    }
    const options = { dateStyle: "short", timeStyle: "short" };
    return date.toDate().toLocaleDateString("pt-BR", options);
  };

  const hour = (start, end) => {
    if (!start || !end) {
      return "";
    }

    const timeMs = end.toDate().getTime() - start.toDate().getTime();
    return transformTime(timeMs);
    // const hours = parseInt(timeMs / 3600000);
    // const min = parseInt((timeMs % 3600000) / 60000);
    // return (hours ? `${hours}h` : "") + `${min}min`;
  };

  const transformTime = (value) => {
    const hours = parseInt(value / 3600000);
    const min = parseInt((value % 3600000) / 60000);
    return (hours ? `${hours}h` : "") + `${min}min`;
  };

  const imgBurguer = (product, i) => {
    return (
      <div className="info">
        <span className="info-b">{i + 1 + " " + product.burguer[i]}</span>
        <span className="info-b">{product.option && product.option[i]}</span>
      </div>
    );
  };
  const rows = [];

  const resultOptions = (product) => {
    let cont = 0;

    product.option &&
      product.option.forEach((b) => {
        if (b.length) {
          b.includes(",") ? (cont += 2) : (cont += 1);
        } else {
        }
      });

    return cont;
  };

  let statusOrder = "";
  props.request.status === 1
    ? (statusOrder = "start")
    : props.request.status === 2
    ? (statusOrder = "progress")
    : (statusOrder = "finished");

  return (
    <div
      className={"container-command " + props.command + " " + statusOrder}
      onClick={props.onClick}
    >
      <div className={"data-command"}>
        <span>{props.request.name}</span>
        <span>{props.request.table}</span>
      </div>
      <div className="data-calendar">
        <div>
          <span>
            {props.request.requestDate
              ? dateAndHour(props.request.requestDate)
              : ""}
          </span>
          {
            <span>
              <img className="timer" src={Tempo} alt="tempo" />
              {props.request.dateDelivery
                ? hour(props.request.requestDate, props.request.dateDelivery)
                : averageTime}
            </span>
          }
        </div>
        <span>{firebase.auth().currentUser.displayName}</span>
      </div>
      <div className={"command"}>
        <ul>
          {props.request.value.map((prod, index) => (
            <li key={index}>
              <span>
                {prod.amount} {prod.item}
                <p>
                  {" "}
                  {prod.burguer &&
                    prod.burguer.forEach((a, i) => {
                      rows.push(imgBurguer(prod, i));
                    })}
                  {prod.burguer && rows}
                </p>
              </span>
              <span>
                {" "}
                R$
                {(prod.amount * prod.price + resultOptions(prod))
                  .toFixed(2)
                  .replace(".", ",")}
              </span>
            </li>
          ))}
        </ul>
        {props.request.note && (
          <p className="note-command">{props.request.note}</p>
        )}
        <div className="result">
          <span>Total: R${props.request.total}</span>
        </div>
      </div>
    </div>
  );
};

export default Command;
