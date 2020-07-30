import React, { useState } from "react";
import ButtonSelector from "./ButtonSelector";
import "./menu.css";
import Delete from "./Delete";

const Table = (props) => {
  const [burguer, setBuguer] = useState(0);
  const [doubleBurguer, setDoubleBuguer] = useState(0);

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
      if (burguer && product.id === "b1") {
        for (let i = 0; i < burguer; i++) {
          rows.push(creatOptions(product.id, burguer));
          rows.push(creatDideDish());
        }
      }
      if (doubleBurguer && product.id === "b2") {
        for (let i = 0; i < doubleBurguer; i++) {
          rows.push(creatOptions(product.id, doubleBurguer));
          rows.push(creatDideDish());
        }
      }

      lastCategory = product.category;
    });
    return rows;
  };

  const creatDideDish = () => {
    return (
      <tr>
        <td colSpan="4" className="options">
          <form className="input-options">
            <div>
              {" "}
              <input type="checkbox" value={1} name="burguer" />
              <label>Queijo</label>
            </div>
            <div>
              {" "}
              <input type="checkbox" name="burguer" value={2} />
              <label>Ovo</label>
            </div>
          </form>
        </td>
      </tr>
    );
  };

  const typeBurguer = (amount, id) => {
    id === "b1" && setBuguer(amount);
    id === "b2" && setDoubleBuguer(amount);
  };

  const creatOptions = (it, amount) => {
    return (
      <tr>
        <td colSpan="4" className="options">
          <form className="input-options">
            <div>
              {" "}
              <input type="radio" value={1} name="burguer" checked={true} />
              <label>Carne Bovina</label>
            </div>
            <div>
              {" "}
              <input type="radio" name="burguer" value={2} />
              <label>Fango</label>
            </div>
            <div>
              {" "}
              <input type="radio" name="burguer" value={3} />
              <label>Vegetariano</label>
            </div>
          </form>
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
