import React from "react";
import logo from "../../img/logo1.png";
import Button from "../../components/Button";
import Command from "../../components/Command";
import "./style.css";

const Kitchen = () => {
  return (
    <div className="container">
      <div className="kitchen">
        <img className="img-kitchen" src={logo} alt="logo" />
        <Button value="Pedidos" />
      </div>
      <Command pedido={{
        name: 'ada',
        table: "01",
        calendar: "25/02/2021",
        schedule: "12:00",
        itens: [{
          product: "água",
          quant: "1"
        }, {
          product: "água",
          quant: "1"
        }]
      }} />
    </div>
  )
};

export default Kitchen;