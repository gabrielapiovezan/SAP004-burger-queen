import React from "react";
// import "./style.css";


const Command = ({ request, onClick }) => {
  const dateAndHour = (date) => {
    if (!date) {
      return ""
    }
    const options = { dateStyle: 'short', timeStyle: 'short' };
    return date.toLocaleDateString('pt-BR', options);
  };
  return (
    <>
      <div className="container-command" onClick={onClick}>
        <div className="data-command">
          <span>{request.name}</span>
          <span>{request.table}</span>
        </div>
        <div className="data-calendar">
          <span>{dateAndHour(request.calendar)}</span>
        </div>
        <ul>
          {request.itens.map((item, index) =>
            <li key={index}>{item.product} {item.quant}</li>
          )}
        </ul>
      </div>
    </>
  );
};


export default Command;