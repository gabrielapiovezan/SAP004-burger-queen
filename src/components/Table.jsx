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

const Table = (props) => {
  const creatProduct = (product) => {
    return (
      <tr>
        <td colSpan="2">{product.item}</td>
        <td align="center">{product.valor}</td>
        <td align="center">
          {<ButtonSelector className={"button-selecto " + props.selector} />}
        </td>
      </tr>
    );
  };

  const creatCategory = (category) => {
    return (
      <tr>
        <th align="start" className="menu-item">
          Item
        </th>
        <th className="menu-type">{category}</th>
        <th className="menu-value">valor</th>
        <th></th>
      </tr>
    );
  };

  const creatTable = () => {
    const rows = [];
    let lastCategory = null;
    props.menu.forEach((product) => {
      if (product.category !== lastCategory) {
        rows.push(creatCategory(product.category));
      }
      rows.push(creatProduct(product));
      lastCategory = product.category;
    });
    return rows;
  };

  return (
    <table className={props.className}>
      <tbody>{creatTable()}</tbody>
    </table>
  );
};

export default Table;
