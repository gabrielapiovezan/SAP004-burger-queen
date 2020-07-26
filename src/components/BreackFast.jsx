import React from "react";
import ButtonSelector from "./ButtonSelector";
import "./menu.css";

const breackfast = [
  { id: "c1", category: "Café da Manha", item: "Café americano", valor: 5.0 },
  { id: "c2", category: "Café da Manha", item: "Café com leite ", valor: 7.0 },
  { id: "c3", category: "Café da Manha", item: "Misto Quente", valor: 10.0 },
  {
    id: "c4",
    category: "Café da Manha",
    item: "Suco de fruta natural",
    valor: 7.0,
  },
];

const Breackfast = () => {
  const category = () => {};

  const creatTable = () => {
    return breackfast.map((product) => {
      return (
        <tbody>
          <td colSpan="2">{product.item}</td>
          <td align="center">{product.valor}</td>
          <td align="center">
            {
              <ButtonSelector className="button-selecto button-selector-breackfast" />
            }
          </td>
        </tbody>
      );
    });
  };

  return (
    <div>
      <table className="table-breackfast">
        <thead>
          <th align="start" className="menu-item">
            Item
          </th>
          <th className="menu-type">Café da manha</th>
          <th className="menu-value">valor</th>
          <th></th>
        </thead>
        {/* <tbody> */}
        {creatTable()}
        {/* <th>produto</th>
          <th>valor</th>
          <th>but</th> */}
        {/* </tbody> */}
      </table>
    </div>
  );
};

export default Breackfast;
