import React from "react";
import "./style.css";


const Command = ({ request, onClick }) => {
  const dateAndHour = (date) => {
    if (!date) {
      return ""
    }
    const options = { dateStyle: 'short', timeStyle: 'short' };
    return date.toDate().toLocaleDateString('pt-BR', options);
  };
  return (
    <>
      <div className="container-command" onClick={onClick}>
        <div className="data-command">
          <span>Nome: {request.value[0].name}</span>
          <span>Mesa: {request.value[0].table}</span>
        </div>
        <div className="data-calendar">
          <span>{dateAndHour(request.requestDate)}</span>
        </div>
        <div className="command">
          <span> Quant.</span>
          <span> Produto</span>
          <span> Adic.</span>
          <ul>
            {request.value.map((prod, index) =>
              <li key={index}>
                <span>
                  {prod.amount} {prod.item}
                  {prod.burguer ? prod.burguer.reduce((burguerPreview, burguerNext, index) => {
                    return burguerPreview += ` ${burguerNext} ${prod.option[index]}`
                  }, "") : ""}
                </span>
                <span>Valor</span>
                <span>
                  {prod.price}
                </span>
              </li>
            )}
          </ul>
          <span>Total: {request.value[0].total}</span>
        </div>
      </div>
    </>
  );
};


export default Command;