import React, { useState, useEff } from "react";
import ButtonSelector from "./ButtonSelector";
import "./menu.css";
import Delete from "./Delete";

const Table = (props) => {
  const creatProduct = (product, i) => {
    return (
      <tr key={product.id}>
        <td colSpan="2">{product.item}</td>
        {props.className === "table-total" ? (
          <td align="center">
            {(product.amount * product.price).toFixed(2).replace(".", ",")}
          </td>
        ) : (
          <td align="center">{product.price.toFixed(2).replace(".", ",")}</td>
        )}
        {props.className !== "table-total" ? (
          <td align="center">
            <ButtonSelector
              className={props.selector}
              index={i}
              menu={props.menu}
              func={props.func}
              product={product}
            />
          </td>
        ) : (
          <td align="center">
            <Delete func={props.func} product={product} />
          </td>
        )}
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
        <th className="menu-value">Valor</th>
        <th className="menu-button"></th>
      </tr>
    );
  };

  const creatTable = () => {
    const rows = [];
    let lastCategory = null;
    props.menu.forEach((product, i) => {
      if (product.category !== lastCategory) {
        rows.push(creatCategory(product.category));
      }
      rows.push(creatProduct(product, i));
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
