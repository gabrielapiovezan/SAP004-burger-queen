import React from "react";
import firebase from "../../firebase/firebase";
import "./style.css";

const Command = (props) => {
  const dateAndHour = (date) => {
    if (!date) {
      return "";
    }
    const options = { dateStyle: "short", timeStyle: "short" };
    return date.toDate().toLocaleDateString("pt-BR", options);
  };

  const imgBurguer = (product, i) => {
    return (
      <div className="info">
        <p className="info-b">{i + 1 + " " + product.burguer[i]}</p>
        <p className="info-b">{product.option && product.option[i]}</p>
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
        <span>{dateAndHour(props.data)}</span>
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
              {/* <span>R${prod.price}</span> */}
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
