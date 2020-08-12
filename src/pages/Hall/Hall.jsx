import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import logo from "../../img/logo1.png";
import Input from "../../components/Input";
import Table from "../../components/Table";
import Button from "../../components/Button";
import MenuBreackfast from "../../components/MenuBreackfast";
import MenuDinner from "../../components/MenuDinner";
import "./hall.css";
import firebase from "../../firebase/firebase";

const Hall = () => {
  const history = useHistory();
  const [menu, setMenu] = useState(true);
  const [value, setValue] = useState([]);
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState({ name: "", table: "", note: "" });
  const [error, setError] = useState("");

  const deleteItem = (item) => {
    const newArray = value.filter((a) => {
      if (a.item !== item) {
        return true;
      }
    });
    setValue(newArray);
  };

  const deleteAll = () => {
    setValue([]);
    setMenu(0);
  };

  const createTotal = (index, menuChoice, amount) => {
    let array = [...value];
    const result = searchIndex(menuChoice[index].item);

    if (result === -1 && amount !== 0) {
      array.push({
        id: value.length,
        category: "Resumo",
        item: menuChoice[index].item,
        price: menuChoice[index].price,
        amount: 1,
      });
      if (menuChoice[index].category === "Hambúrgueres")
        array[array.length - 1] = {
          ...array[array.length - 1],
          burguer: ["Carne Bovina"],
          option: [""],
        };
    } else {
      array[result].amount = amount;
      if (menuChoice[index].category === "Hambúrgueres") {
        array[result].burguer = [...array[result].burguer, "Carne Bovina"];
        array[result].option = [...array[result].option, ""];
      }
    }
    setValue(array);
  };

  const setData = () => {
    setValue([]);
    setMenu(!menu);
  };

  const searchIndex = (item) => {
    return value
      .map((a) => {
        return a.item;
      })
      .indexOf(item);
  };

  const setBurguer = (product, burguer, index) => {
    const newArray = [...value];
    const result = searchIndex(product.item);
    newArray[result].burguer[index] = burguer;
    setValue(newArray);
  };

  const setOptions = (product, option, index) => {
    const newArray = [...value];
    const result = searchIndex(product.item);
    let options = newArray[result].option[index] || "";
    if (options.includes(option)) {
      options = options.replace(option, "");
      if (options.includes(",")) options = options.replace(",", "");
    } else {
      if (options !== "") options += ",";
      options += option;
    }

    newArray[result].option[index] = options;
    setValue(newArray);
  };

  const updateData = (event, param) => {
    setOrder({ ...order, [param]: event.target.value });
  };

  useEffect(() => {
    totalOrder();
  }, [value]);

  const totalOrder = () => {
    let cont = 0;
    value.forEach((a) => {
      a.option &&
        a.option.forEach((b) => {
          if (b.length) {
            b.includes(",") ? (cont += 2) : (cont += 1);
          }
        });
    });

    setTotal(
      value.reduce((acc, att) => acc + att.price * att.amount, 0) + cont
    );
  };

  const saveOrder = async () => {
    if (order.name && order.table) {
      const obj = {
        value,
        requestDate: new Date(),
        status: 1,
        note: order.note,
        name: order.name,
        table: order.table,
        total: total,
      };

      await firebase.firestore().collection("orders").add(obj);
      deleteAll();
      setError("");
      history.push("/delivery");
    } else {
      setError("Por favor, digite as informações sobre o pedido.");
    }
  };

  const note = (valueNote) => {
    setOrder({ ...order, note: valueNote });
  };

  return (
    <div className="hall">
      <div className="data">
        <img className="img-hall" src={logo} alt="logo" />
        <div className="box-data">
          <Input
            type="text"
            placeholder="Nome"
            className="input name-input"
            onChange={(e) => updateData(e, "name")}
          />
          <div className="data-table">
            <h1 className="text">MESA</h1>
            <Input
              placeholder="Mesa"
              className="input table-input"
              type="number"
              onChange={(e) => updateData(e, "table")}
            />
          </div>
        </div>
      </div>
      <div className="table">
        <div className="container-table">
          <div className="buttons-menu">
            <button
              className="button-menu breack-fast"
              onClick={() => setData()}
            >
              Café da manha
            </button>
            <button className="button-menu dinner" onClick={() => setData()}>
              Almoço e jantar
            </button>
          </div>

          {menu ? (
            <Table
              className="table-breackfast"
              menu={MenuBreackfast}
              selector="button-selector-breackfast"
              func={[createTotal, deleteItem]}
              total={value}
            />
          ) : (
              <Table
                className="table-dinner"
                menu={MenuDinner}
                selector="button-selector-dinner"
                func={[createTotal, deleteItem, setBurguer, setOptions]}
                total={value}
              />
            )}
        </div>
        <span className="container-table-total">
          {value[0] && (
            <>
              <Table
                className="table-total"
                menu={value}
                selector="button-selector-dinner"
                func={[deleteItem, deleteAll]}
                total={total}
                note={note}
              />
              <div className="error">{error}</div>
              <Button value="Enviar" onClick={() => saveOrder()} />
            </>
          )}
        </span>
      </div>
    </div>
  );
};

export default Hall;
