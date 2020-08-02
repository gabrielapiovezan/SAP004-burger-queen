import React, { useState, useEffect } from "react";
import ButtonSelector from "./ButtonSelector";
import "./menu.css";
import ButtonIcon from "./Button-Icon";
import Lixo from "../img/lixo.png";
import Chicken from "../img/Chicken.png";
import Ox from "../img/Ox.png";
import Plant from "../img/Plant.png";
import Chease from "../img/chease.png";
import Egg from "../img/egg.png";

const Table = (props) => {
  const [burguer, setBuguer] = useState([
    { item: "Hambúrguer simples", amount: 0, typeBurguer: [], sideSish: [] },
    { item: "Hambúrguer duplo", amount: 0, typeBurguer: [], sideSish: [] },
  ]);

  const searchIndex = (item) => {
    return burguer
      .map((a) => {
        return a.item;
      })
      .indexOf(item);
  };

  const imgBurguer = (burguers, options) => {
    let type;
    let result = " - ";

    burguers.forEach((a, i) => {
      result += i + 1 + "º" + " " + a + " ";
      options.forEach((op) => {
        result += "+" + op;
      });
    });

    return result.replace(",", " e ");
  };

  const creatProduct = (product, i) => {
    return (
      <tr key={product.id + product.category}>
        {props.className === "table-total" ? (
          <>
            {" "}
            <td colSpan="2">
              {product.item}
              {product.burguer && imgBurguer(product.burguer, product.option)}
            </td>
            <td align="center">
              {(product.amount * product.price).toFixed(2).replace(".", ",")}
            </td>
            <td align="center" className="del">
              {product.amount}x
              <ButtonIcon
                func={props.func[0]}
                product={product.item}
                name="Delete"
                img={Lixo}
                alt="delete"
              />
            </td>
          </>
        ) : (
          <>
            <td colSpan="2">{product.item}</td>
            <td align="center">{product.price.toFixed(2).replace(".", ",")}</td>
            <td align="center">
              <ButtonSelector
                className={props.selector}
                index={i}
                menu={props.menu}
                func={[...props.func, typeBurguer]}
                product={product}
                total={props.total}
              />
            </td>
          </>
        )}
      </tr>
    );
  };

  const creatCategory = (category) => {
    return (
      <tr key={category}>
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
        const result = searchIndex(product.item);

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
    const result = searchIndex(product.item);

    array[result].amount = amount;
    if (amount > 0) {
      array[result].typeBurguer[amount - 1] = "Carne Bovina"; // : "";
      array[result].sideSish[amount - 1] = [];
    }
    setBuguer(array);
  };

  const funcRadio = (product, index, type) => {
    const array = [...burguer];

    const result = searchIndex(product.item);

    array[result].typeBurguer[index] = type;

    setBuguer(array);
  };

  const funcCheck = (product, index, type) => {
    const result = burguer
      .map((a) => {
        return a.item;
      })
      .indexOf(product.item);
    const array = [...burguer];
    array[result].sideSish[index].includes(type)
      ? array[result].sideSish[index].splice(
          array[result].sideSish[index].indexOf(type),
          1
        )
      : array[result].sideSish[index].push(type);

    setBuguer(array);
  };

  const creatOptions = (product, index) => {
    const result = searchIndex(product.item);

    return (
      <tr>
        <td className="option-item">{index + 1}º</td>
        <td colSpan="3" className="options" align="center">
          <div className="buttons-box">
            <div className="box-buttons">
              <span className="type-option-burguer">Carne</span>
              <span className="input-options">
                <ButtonIcon
                  img={Ox}
                  name="Bovina"
                  func={props.func[2]}
                  product={product}
                  type={"Carne Bovina"}
                  index={index}
                  colorButton={funcRadio}
                  className={
                    burguer[result].typeBurguer[index] === "Carne Bovina" &&
                    "checked"
                  }
                />
                <ButtonIcon
                  img={Chicken}
                  name="Frango"
                  func={props.func[2]}
                  product={product}
                  type={"Frango"}
                  index={index}
                  colorButton={funcRadio}
                  className={
                    burguer[result].typeBurguer[index] === "Frango" && "checked"
                  }
                />
                <ButtonIcon
                  img={Plant}
                  name="Veg"
                  func={props.func[2]}
                  product={product}
                  type={"Vegetariano"}
                  index={index}
                  colorButton={funcRadio}
                  className={
                    burguer[result].typeBurguer[index] === "Vegetariano" &&
                    "checked"
                  }
                />
              </span>
            </div>
            <div className="box-buttons">
              <span className="type-option-burguer">Acompanhamentos</span>
              <span className="input-options">
                <ButtonIcon
                  img={Chease}
                  name="Queijo"
                  func={props.func[3]}
                  product={product}
                  type={"Queijo"}
                  index={index}
                  colorButton={funcCheck}
                  className={
                    burguer[result].sideSish[index].includes("Queijo") &&
                    "checked"
                  }
                />
                <ButtonIcon
                  img={Egg}
                  name="Ovo"
                  func={props.func[3]}
                  product={product}
                  type={"Ovo"}
                  index={index}
                  colorButton={funcCheck}
                  className={
                    burguer[result].sideSish[index].includes("Ovo") && "checked"
                  }
                />
              </span>
            </div>
          </div>
        </td>
      </tr>
    );
  };

  const resume = () => {
    return (
      <>
        <tr>
          <td colSpan="4" className="resume"></td>
        </tr>
        <tr>
          <td colSpan="2">Total</td>
          <td align="center">
            {/* {props.menu
              .reduce((acc, att) => acc + att.price * att.amount, 0)
              .toFixed(2)
              .replace(".", ",")} */}
            {props.total.toFixed(2).replace(".", ",")}
          </td>
          <td align="center" className="del">
            {props.menu.reduce((acc, att) => acc + att.amount, 0)}
            x
            <ButtonIcon
              func={props.func[1]}
              name="delete"
              img={Lixo}
              alt="deleteca"
            />
          </td>
        </tr>
      </>
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
