import React from "react";
import ButtonSelector from "./ButtonSelector";

const accompaniment = [
  { id: 1, item: "Batata frita", valor: 5.0 },
  { id: 2, item: "Anéis de cebola ", valor: 5.0 },
];

const burguers = [
  { id: 1, item: "Hambúrguer simples", valor: 10.0 },
  { id: 2, item: "Hambúrguer duplo ", valor: 15.0 },
];

const drinks = [
  { id: 1, item: "Água 500ml", valor: 5.0 },
  { id: 2, item: "Água 750ml ", valor: 7.0 },
  { id: 3, item: "Refrigerante 500ml", valor: 7.0 },
  { id: 4, item: "Refrigerante 750ml", valor: 10.0 },
];

const Dinner = (props) => {
  const creatTable = (products) => {
    return products.map((product) => {
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
      <table>
        <thead>
          <th>Item</th>
          <th>HAMBÚRGUERES</th>
          <th>valor</th>
        </thead>
        <tbody>{creatTable(burguers)}</tbody>
        <thead>
          <th>Item</th>
          <th>ACOMPANHAMENTOS</th>
          <th>valor</th>
        </thead>
        <tbody>{creatTable(accompaniment)}</tbody>
        <thead>
          <th>Item</th>
          <th>Bebidas</th>
          <th>valor</th>
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
