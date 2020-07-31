import React, { useState } from "react";
import ButtonSelector from "./ButtonSelector";
import Button from "../components/Button";
import "./menu.css";
import ButtonOptions from "./ButtonOption";
import Delete from "./Delete";

const Table = (props) => {
  const [burguer, setBuguer] = useState([
    { item: "Hambúrguer simples", amount: 0 },
    { item: "Hambúrguer duplo", amount: 0 },
  ]);
  // const [doubleBurguer, setDoubleBuguer] = useState(0);

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
              func={[...props.func, typeBurguer]}
              product={product}
            />
          </td>
        ) : (
          <td align="center">
            {product.amount}x
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
      if (product.category === "Hambúrgueres") {
        const result = burguer
          .map((a) => {
            return a.item;
          })
          .indexOf(product.item);
        for (let j = 0; j < burguer[result].amount; j++) {
          rows.push(creatOptions(product, j));
        }
      }

      lastCategory = product.category;
    });
    return rows;
  };

  const typeBurguer = (amount, product) => {
    let array = [...burguer];
    const result = burguer
      .map((a) => {
        return a.item;
      })
      .indexOf(product.item);
    array[result].amount = amount;
    setBuguer(array);
  };

  const creatOptions = (product, index) => {
    // const productSelect = burguer.filter((burg) => burg.item === product.item);
    return (
      <tr>
        <td colSpan="4" className="options" align="center">
          <div className="input-options">
            <Button
              className=" button button-options"
              value="Carne Bovina"
              onClick={() => props.func[2](product, "Carne Bovina", index)}
            />
            <Button
              className=" button button-options"
              value="Frango"
              onClick={() => props.func[2](product, "Frango", index)}
            />
            <Button
              className=" button button-options"
              value="Vegetariano"
              onClick={() => props.func[2](product, "Vegetariano", index)}
            />
          </div>
          <div className="input-options">
            <Button
              className=" button button-options"
              value="Queijo"
              onClick={() => props.func[3](product, "Queijo", index)}
            />
            <Button
              className=" button button-options"
              value="Ovo"
              onClick={() => props.func[3](product, "Ovo", index)}
            />
          </div>
        </td>
      </tr>
    );
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
