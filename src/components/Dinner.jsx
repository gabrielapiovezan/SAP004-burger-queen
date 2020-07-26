import React from "react";
import ButtonSelector from "./ButtonSelector";
import "./menu.css";

const accompaniment = [
  { id: "a1", item: "Batata frita", valor: 5.0 },
  { id: "a2", item: "Anéis de cebola ", valor: 5.0 },
];

const burguers = [
  { id: "b1", item: "Hambúrguer simples", valor: 10.0 },
  { id: "b2", item: "Hambúrguer duplo ", valor: 15.0 },
];

const drinks = [
  { id: "d1", item: "Água 500ml", valor: 5.0 },
  { id: "d2", item: "Água 750ml ", valor: 7.0 },
  { id: "d3", item: "Refrigerante 500ml", valor: 7.0 },
  { id: "d4", item: "Refrigerante 750ml", valor: 10.0 },
];

const Dinner = (props) => {
  const creatTable = (products) => {
    return products.map((product) => {
      return (
        <tr column-width="100px" key={product.id}>
          <td colSpan="2">{product.item}</td>
          <td align="center">{product.valor}</td>
          <td>
            {
              <ButtonSelector className="button-selecto button-selector-dinner" />
            }
          </td>
        </tr>
      );
    });
  };
  // console.log(props.choice);
  // if (props.choice)
  return (
    <div>
      <table className="table-dinner">
        <thead>
          <th align="start" className="menu-item">
            Item
          </th>
          <th className="menu-type">HAMBÚRGUERES</th>
          <th className="menu-value">valor</th>
          <th></th>
        </thead>
        <tbody>{creatTable(burguers)}</tbody>
        <thead>
          <th align="start">Item</th>
          <th className="menu-type">ACOMPANHAMENTOS</th>
          <th className="menu-value">valor</th>
          <th></th>
        </thead>
        <tbody>{creatTable(accompaniment)}</tbody>
        <thead>
          <th align="start">Item</th>
          <th className="menu-type">Bebidas</th>
          <th className="menu-value">valor</th>
          <th></th>
        </thead>
        <tbody>{creatTable(drinks)}</tbody>
        {/* <th>produto</th>
            <th>valor</th>
            <th>but</th> */}
      </table>
    </div>
  );
};

export default Dinner;
