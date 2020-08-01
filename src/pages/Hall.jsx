import React, { useState, useEffect } from "react";
import logo from "../img/logo1.png";
import Input from "../components/Input";
import Table from "../components/Table";
import Button from "../components/Button";
import MenuBreackfast from "../components/MenuBreackfast";
import MenuDinner from "../components/MenuDinner";
import "./hall.css";

const Hall = () => {
  const [menu, setMenu] = useState(true);
  const [value, setValue] = useState([]);
  // const [teste, setTeste] = useState("");
  const deleteItem = (item) => {
    const newArray = value.filter((a) => {
      if (a.item !== item) {
        return true;
      }
    });

    setValue(newArray);
  };

  const createTotal = (index, menuChoice, amount) => {
    let array = [...value];
    const result = value
      .map((a) => {
        return a.item;
      })
      .indexOf(menuChoice[index].item);

    if (result === -1 && amount !== 0) {
      array.push({
        id: value.length,
        category: "Resumo",
        item: menuChoice[index].item,
        price: menuChoice[index].price,
        amount: 1,
        burguer: [],
        option: [],
      });
    } else {
      array[result].amount = amount;
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

    newArray[result].option[index] = options;
    setValue(newArray);
  };

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <div className="hall">
      <div className="data">
        <img className="img-hall" src={logo} alt="logo" />
        <div className="box-data">
          <Input type="text" placeholder="Nome" className="input name-input" />
          <div className="data-table">
            <h1 className="text">MESA</h1>
            <Input placeholder="Mesa" className="input table-input" />
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
        />
      ) : (
        <Table
          className="table-dinner"
          menu={MenuDinner}
          selector="button-selector-dinner"
          func={[createTotal, deleteItem, setBurguer, setOptions]}
        />
      )}
      {value[0] && (
        <>
          <Table
            className="table-total"
            menu={value}
            selector="button-selector-dinner"
            func={deleteItem}
          />
          <Button value="Enviar" />
        </>
      )}
    </div>
  );
};

export default Hall;
