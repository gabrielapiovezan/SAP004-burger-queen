import React from "react";
import ButtonSelector from "./ButtonSelector";
import "./breackfast.css";

const breackfast = [
  { id: 1, item: "Café americano", valor: 5.0 },
  { id: 2, item: "Café com leite ", valor: 7.0 },
  { id: 3, item: "Misto Quente", valor: 10.0 },
  { id: 4, item: "Suco de fruta natural", valor: 7.0 },
];

const Breackfast = () => {
  const creatTable = () => {
    return breackfast.map((product) => {
      return (
        <tr>
          <td>{product.item}</td>
          <td>{product.valor}</td>
          <td>{<ButtonSelector />}</td>
        </tr>
      );
    });
  };

  return (
    <div>
      <table className="table" className="table">
        <thead>
          <th>Item</th>
          <th>valor</th>
        </thead>
        <tbody>
          {creatTable()}
          {/* <th>produto</th>
          <th>valor</th>
          <th>but</th> */}
        </tbody>
      </table>
    </div>
  );
};

export default Breackfast;
