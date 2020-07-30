import React, { useState, useEffect } from "react";
import logo from "../img/logo1.png";
import Input from "../components/Input";
import Table from "../components/Table";
import MenuBreackfast from "../components/MenuBreackfast";
import MenuDinner from "../components/MenuDinner";
import "./hall.css";

const Hall = () => {
  const [menu, setMenu] = useState(true);
  const [value, setValue] = useState([]);

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
    const newArray = value.filter((a, i) => {
      if (menuChoice[index].item && a.item === menuChoice[index].item) {
        array[i].amount = amount;
        value[i].amount = amount;
        setValue(array);
        return true;
      }
    });

    if (!newArray[0] && amount !== 0) {
      const objProduct = {
        id: value.length,
        category: "Resumo",
        item: menuChoice[index].item,
        price: menuChoice[index].price,
        amount: 1,
      };

      setValue([...value, objProduct]);
    }
  };

  useEffect(() => {}, [value]);

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
        <button
          className="button-menu breack-fast"
          onClick={() => setMenu(true)}
        >
          Café da manha
        </button>
        <button className="button-menu dinner" onClick={() => setMenu(false)}>
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
          func={[createTotal, deleteItem]}
        />
      )}
      {value[0] && (
        <Table
          className="table-total"
          menu={value}
          selector="button-selector-dinner"
          func={deleteItem}
        />
      )}
    </div>
  );
};

export default Hall;
