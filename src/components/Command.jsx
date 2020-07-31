import React from "react";
// import "./style.css";


const Command = ({ pedido }) => {
  return (
    <>
      <div className="data-commands">
        <span>{pedido.name}</span>
        <span>{pedido.table}</span>
      </div>
      <div>
        <span>{pedido.calendar}{pedido.schedule}</span>
      </div>
      <br />
      <ul>
        {pedido.itens.map(item =>
          <li>{item.product}-{item.quant}</li>
        )}
      </ul>
    </>
  );
};


export default Command;