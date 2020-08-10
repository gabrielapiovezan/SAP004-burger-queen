import React from "react";
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
              <span>R${prod.price}</span>
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
