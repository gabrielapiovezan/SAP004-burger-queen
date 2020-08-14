import React from "react";
import "./style.css";

const Button = (props) => {
  return (
    <button className="button " {...props}>
      {props.value}
    </button>
  );
};

export default Button;
