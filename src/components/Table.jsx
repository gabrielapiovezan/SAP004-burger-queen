import React, { Component } from "react";
import Breackfast from "./BreackFast";
import ButtonSelector from "./ButtonSelector";
import "./table.css";

const Table = (props) => {
  const creatTable = () => {
    return Breackfast.map((product) => {
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
      <table className="table">
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

export default Table;
