import React, { useState, useEffect } from "react";
import ButtonSelector from "./ButtonSelector";
import Button from "../components/Button";
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
    { item: "Hambúrguer simples", amount: 0 },
    { item: "Hambúrguer duplo", amount: 0 },
  ]);

  const [check, setCheck] = useState([false, false]);
  const [radio, setRadio] = useState([true, false, false]);

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
          <td align="center" className="del">
            {product.amount}x
            <ButtonIcon
              func={props.func}
              product={product.item}
              name="Delete"
              // onClick={() => props.func(props.product.item)}
              // // onClick={() => props.func(product.item)}
              img={Lixo}
              alt="delete"
              //props.func(product.item)}
            />
            {/* <Delete func={props.func} product={product} /> */}
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

  const funcRadio = (idButton) => {
    //  if (idButton < 3) {
    const array = [false, false, false];
    array[idButton] = true;
    setRadio(array);
  };

  const funcCheck = (idButton) => {
    const array = check;
    array[idButton] = !check[idButton];
    setCheck(array);
  };
  // useEffect(() => {
  //   console.log(check);
  // }, [check]);

  const creatOptions = (product, index) => {
    // const productSelect = burguer.filter((burg) => burg.item === product.item);
    return (
      <tr>
        <td className="option-item">{index + 1}º</td>
        <td colSpan="3" className="options" align="center">
          <span className="input-options">
            <ButtonIcon
              img={Ox}
              name="Bovina"
              func={props.func[2]}
              product={product}
              type={"Carne Bovina"}
              index={index}
              idButton={0}
              colorButton={funcRadio}
              className={radio[0] && "checked"}
            />
            <ButtonIcon
              img={Chicken}
              // className=" button button-options"
              name="Frango"
              func={props.func[2]}
              product={product}
              type={"Frango"}
              index={index}
              idButton={1}
              colorButton={funcRadio}
              className={radio[1] && "checked"}
            />
            <ButtonIcon
              img={Plant}
              name="Veg"
              func={props.func[2]}
              product={product}
              type={"Vegetariano"}
              index={index}
              idButton={2}
              colorButton={funcRadio}
              className={radio[2] && "checked"}
              // onClick={() => props.func[2](product, "Vegetariano", index)}
            />
          </span>
          <span className="input-options">
            <ButtonIcon
              img={Chease}
              name="Queijo"
              func={props.func[3]}
              product={product}
              type={"Queijo"}
              index={index}
              idButton={0}
              colorButton={funcCheck}
              className={check[0] && "checked"}
              // onClick={() => props.func[3](product, "Queijo", index)}
            />
            <ButtonIcon
              img={Egg}
              // className=" button button-options"
              name="Ovo"
              func={props.func[3]}
              product={product}
              type={"Ovo"}
              index={index}
              idButton={1}
              colorButton={funcCheck}
              className={check[1] && "checked"}
              // onClick={() => props.func[3](product, "Ovo", index)}
            />
          </span>
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
