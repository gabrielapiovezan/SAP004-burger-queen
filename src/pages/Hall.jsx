import React, { useState } from "react";
import logo from "../img/logo1.png";
import Input from "../components/Input";
import Table from "../components/Table";
import MenuBreackfast from "../components/MenuBreackfast";
import MenuDinner from "../components/MenuDinner";
import "./hall.css";

const Hall = () => {
  const [menu, setMenu] = useState(false);

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
        <button className="breack-fast" onClick={() => setMenu(false)}>
          Café da manha
        </button>
        <button className="dinner" onClick={() => setMenu(true)}>
          Almoço e jantar
        </button>
      </div>

      <Table
        className="table-breackfast"
        menu={MenuBreackfast}
        selector="button-selector-breackfast"
      />
      <Table
        className="table-dinner"
        menu={MenuDinner}
        selector="button-selector-dinner"
      />
      <Table
        className="table-total"
        menu={MenuBreackfast}
        selector="button-selector-dinner"
      />
    </div>
  );
};

export default Hall;
