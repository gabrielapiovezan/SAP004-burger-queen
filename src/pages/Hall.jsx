import React, { useState, useEffect } from "react";
import logo from "../img/logo1.png";
import Input from "../components/Input";
import Table from "../components/Table";
import MenuBreackfast from "../components/MenuBreackfast";
import MenuDinner from "../components/MenuDinner";
import "./hall.css";

const Hall = () => {
  const [menu, setMenu] = useState(false);
  const [value, setValue] = useState([]);

  const createTotal = (index, menuChoice, amount) => {
    let array = value;
    const newArray = value.filter((a, i) => {
      if (a.item === menuChoice[index].item) {
        array[i].amount += 1;
        array[i].total = array[i].amount * array[i].price;
        // setValue([...value, (value[i].total = array[i].total)]);
        // setValue((value = array));
        // setValue(array);
        setValue(...value);

        console.log(value);

        // console.log(array[i].price);
        // console.log(array[i].total);
        return true;
      }
    });

    if (!newArray[0]) {
      //  let oi = [];
      array = {
        id: value.length,
        category: "Total",
        item: menuChoice[index].item,
        price: menuChoice[index].price,
        amount: 1,
        total: menuChoice[index].price,
      };
      // array = [menuChoice[index]];
      // console.log(value.length);
      // array[0].id = `t${value.length}`;
      // array[0].category = "Total";
      // console.log(menuChoice[index]);
      //  console.log(array);

      setValue([...value, array]);

      // setValue([...value, (value[value.length - 1].category = "oi")]);
    }
    // else {
    //   setValue(array);
    // }
    //   setValue([...value, array]);
  };

  return (
    <div className="hall">
      <div className="data">
        <img className="img-hall" src={logo} alt="logo" />
        <div className="box-data">
          <Input type="text" placeholder="Nome" className="input name-input" />
          <div className="data-table">
            <h1 className="text">MESA</h1>
            <Input
              // type="number"
              placeholder="Mesa"
              className="input table-input"
            />
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
          func={createTotal}
        />
      ) : (
        <Table
          className="table-dinner"
          menu={MenuDinner}
          selector="button-selector-dinner"
          func={createTotal}
        />
      )}
      {/* <Table
        className="table-total"
        menu={MenuBreackfast}
        selector="button-selector-dinner"
        func={createTotal}
      /> */}
      <Table
        className="table-total"
        menu={value}
        selector="button-selector-dinner"
        func={createTotal}
      />
      ;
    </div>
  );
};

export default Hall;
