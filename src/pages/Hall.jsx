import React, { useState, useEffect } from "react";
import logo from "../img/logo1.png";
import Input from "../components/Input";
import Table from "../components/Table";
import Button from "../components/Button";
import MenuBreackfast from "../components/MenuBreackfast";
import MenuDinner from "../components/MenuDinner";
import "./hall.css";
import firebase from "../firebase/firebase";

const Hall = () => {
  const [menu, setMenu] = useState(true);
  const [value, setValue] = useState([]);
  const [orderData, setOrderData] = useState({});

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
    setOrderData({});
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
          option: [],
        };
    } else {
      array[result].amount = amount;
      array[result].burguer = [...array[result].burguer, "Carne Bovina"];
      array[result].option = [...array[result].option, []];
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
    const options = newArray[result].option[index] || [];
    options.includes(option)
      ? options.splice(options.indexOf(option), 1)
      : options.push(option);
    console.log(result);
    newArray[result].option[index] = options;
    setValue(newArray);
  };

  const updateData = (event, param) => {
    setOrderData({ ...orderData, [param]: event.target.value });
  };

  useEffect(() => {
    console.log(orderData);
  }, [orderData]);

  const saveOrder = async () => {
    const obj = {};
    obj[0] = {
      Nome: orderData.name,
      Mesa: orderData.table,
      Total: value.reduce((acc, att) => acc + att.price * att.amount, 0),
    };
    value.forEach((a, i) => {
      obj[i + 1] = a;
    });
    await firebase.firestore().collection("orders").add(obj);
    deleteAll();
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
            value={orderData.name}
          />
          <div className="data-table">
            <h1 className="text">MESA</h1>
            <Input
              placeholder="Mesa"
              className="input table-input"
              type="number"
              onChange={(e) => updateData(e, "table")}
              value={orderData.table}
            />
          </div>
        </div>
      </div>
      <div className="buttons-menu">
        <button className="button-menu breack-fast" onClick={() => setData()}>
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
      {value[0] && (
        <>
          <Table
            className="table-total"
            menu={value}
            selector="button-selector-dinner"
            func={[deleteItem, deleteAll]}
          />
          <Button value="Enviar" onClick={() => saveOrder()} />
        </>
      )}
    </div>
  );
};

export default Hall;
