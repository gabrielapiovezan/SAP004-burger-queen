import React from "react";
import "./style.css";

// class Button extends React.Component {
//   render() {
const Button = (props) => {
  return (
    <button {...props}>{props.value}</button> //onClick={this.props.onClick}>{this.props.value}
  );
};
//}

export default Button;
