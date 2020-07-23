import React from "react";
import ButtonSelector from "../components/ButtonSelector";
import Table from "../components/Table";
import Breackfast from "../components/BreackFast";
import logo from "../img/logo1.png";
import Input from "../components/Input";
import "./hall.css";

const Hall = () => {
  return (
    <div className="hall">
      <div className="data">
        <img className="img" src={logo} alt="logo" />
        <div className="box-data">
          <Input type="text" placeholder="Nome" className="input name-input" />
          <div className="data-table">
            <h1 className="text">MESA</h1>
            <Input
              type="number"
              placeholder="Mesa"
              className="input table-input"
            />
          </div>
        </div>
      </div>
      <div className="buttons-menu">
        <button className="breack-fast">Café da manha</button>
        <button className="dinner">Almoço e jantar</button>
      </div>
      <Table products={Breackfast} />
    </div>
  );
};

export default Hall;
