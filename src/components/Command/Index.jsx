import React from "react";
import firebase from "../../firebase/firebase";
import Tempo from "../../img/tempo.png";
import "./style.css";

const Command = (props) => {
  const dateAndHour = (date) => {
    if (!date) {
      return "";
    }
    const options = { dateStyle: "short", timeStyle: "short" };
    return date.toDate().toLocaleDateString("pt-BR", options);
  };

  const averageTime = () => {
    // const end = props.request.filter((a) => a.dateDelivery);
    console.log(props.request);
  };
  averageTime();
  const hour = (start, end) => {
    if (!start || !end) {
      return "";
    }

    const timeMs = end.toDate().getTime() - start.toDate().getTime();

    const hours = parseInt(timeMs / 3600000);
    const min = parseInt((timeMs % 3600000) / 60000);
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
          <span>{dateAndHour(props.request.requestDate)}</span>
          {props.request.dateDelivery && (
            <span>
              <img className="timer" src={Tempo} alt="tempo" />
              {hour(props.request.requestDate, props.request.dateDelivery)}
            </span>
          )}
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
