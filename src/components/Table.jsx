import React from "react";
import ButtonSelector from "./ButtonSelector";
import "./menu.css";

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

  const resume = () => {
    return (
      <tr>
        <td colSpan="4" className="resume"></td>
      </tr>
    );
  };

  return (
    <table className={props.className}>
      <tbody>{creatTable()}</tbody>
      {props.className === "table-total" && resume()}
    </table>
  );
};

export default Table;
