import React from "react";
import Lixo from "../img/lixo.png";
import "./style.css";
const Delete = (props) => {
  return (
    <img
      className="delete"
      // onClick={() => props.func(props.product.item)}
      src={Lixo}
      alt="deletar"
    />
  );
};

export default Delete;
