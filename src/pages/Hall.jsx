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
        <span>
          <Input type="text" placeholder="Nome" className="button name-input" />
          <h1>MESA</h1>
          <Input
            type="text"
            placeholder="Mesa"
            className="button table-input"
          />
        </span>
      </div>
      <Table products={Breackfast} />
    </div>
  );
};

export default Hall;
