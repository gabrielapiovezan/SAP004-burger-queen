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

  const resultOptions = (product) => {
    let cont = 0;

    product.option &&
      product.option.forEach((b) => {
        if (b.length) {
          b.includes(",") ? (cont += 2) : (cont += 1);
        } else {
        }
      });

    return cont;
  };

  const creatProduct = (product, i) => {
    return (
      <>
        <tr key={product.item + i + product.category}>
          {props.className === "table-total" ? (
            <>
              <td colSpan="2">
                {product.item}
                {product.burguer && imgBurguer(product.burguer, product.option)}
              </td>
              <td align="center">
                R$
                {(product.amount * product.price + resultOptions(product))
                  .toFixed(2)
                  .replace(".", ",")}
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
              <td colSpan="3" valign="bottom">
                {product.item}
              </td>
              <td align="right" rowSpan="2" className="line-table">
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
        <tr>
          <td className="price" valign="top">
            R$
            {product.price.toFixed(2).replace(".", ",")}
          </td>
        </tr>
      </>
    );
  };

  const creatCategory = (product, i) => {
    return (
      <>
        <tr>
          {i > 0 && (
            <td
              colSpan="4"
              className={
                product.category === "Café da Manhã"
                  ? "resume-breackfast"
                  : "resume"
              }
            ></td>
          )}
        </tr>
        <tr key={product.category + product.item}>
          {/* <th align="start" className="menu-item">
          Item
        </th> */}

          <th
            // className="menu-type"
            align="left"
            colSpan="3"
            className={
              product.category === "Café da Manhã"
                ? "menu-type-breackfast"
                : "menu-type"
            }
          >
            {product.category.toUpperCase()}
          </th>
          {/* <th className="menu-value">Valor</th> */}
          <th className="menu-button"></th>
        </tr>
        <tr>
          <td
            colSpan="4"
            className={
              product.category === "Café da Manhã"
                ? "resume-breackfast"
                : "resume"
            }
          ></td>
        </tr>
      </>
    );
  };

  const creatTable = () => {
    const rows = [];
    let lastCategory = null;
    props.menu.forEach((product, i) => {
      if (product.category !== lastCategory) {
        rows.push(creatCategory(product, i));
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
      <>
        <tr key={product.item + product.category + index}>
          {/* <td className="option-item">{index + 1}º</td> */}
          <td colSpan="4" className="options">
            <div className="buttons-box">
              <div className="box-buttons">
                <span className="type-option-burguer">Hamburguer</span>
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
                      burguer[result].typeBurguer[index] === "Frango" &&
                      "checked"
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
                <span className="type-option-burguer">Add +R$1,00</span>
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
                      burguer[result].sideSish[index].includes("Ovo") &&
                      "checked"
                    }
                  />
                </span>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td colSpan="4" className="resume"></td>
        </tr>
      </>
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
          <td align="center">{props.total.toFixed(2).replace(".", ",")}</td>
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
    <table key={props.className} className={props.className}>
      <tbody>{creatTable()}</tbody>
      {props.className === "table-total" && resume()}
    </table>
  );
};

export default Table;
