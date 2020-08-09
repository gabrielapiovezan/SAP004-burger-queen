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
        <p className="info-order info-burguer">
          {i + 1 + " " + product.burguer[i]}
        </p>
        <p className="info-order info-burguer">
          {product.option && product.option[i]}
        </p>
      </div>
    );
  };
  const rows = [];
  return (
    <div
      className={"container-command " + props.command}
      onClick={props.onClick}
    >
      <div className={"data-command"}>
        {/* <span>Nome: {props.request.value[0].name}</span>
        <span>Mesa: {props.request.value[0].table}</span> */}
        <span>Nome: {props.request.name}</span>
        <span>Mesa: {props.request.table}</span>
      </div>
      <div className="data-calendar">
        <span>{dateAndHour(props.request.requestDate)}</span>
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
                {/* {prod.burguer
                  ? prod.burguer.reduce(
                      (burguerPreview, burguerNext, index) => {
                        return (burguerPreview += ` ${burguerNext} ${prod.option[index]}`);
                      },
                      ""
                    )
                  : ""} */}
              </span>
              <span>R${prod.price}</span>
            </li>
          ))}
        </ul>
        {props.request.note && <p className="note">{props.request.note}</p>}
        <div className="result">
          <span>Total: R${props.request.total}</span>
        </div>
      </div>
    </div>
  );
};

export default Command;
