import React from "react";
// import "./style.css";


const Command = ({ request }) => {
  return (
    <>
      <div className="container-command">
        <div className="data-command">
          <span>{request.name}</span>
          <span>{request.table}</span>
        </div>
        <div className="data-calendar">
          <span>{request.calendar}</span>
          <span>{request.schedule}</span>
        </div>
        <ul>
          {request.itens.map(item =>
            <li>{item.product} {item.quant}</li>

          )}
        </ul>
      </div>
    </>
  );
};


export default Command;