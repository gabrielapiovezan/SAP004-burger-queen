import React from "react";
import "./style.css";
import "./button.css";

class Button extends React.Component {
  render() {
    return (
      <button onClick={() => alert("funciona")}>{this.props.value}</button>
    );
  }
}

export default Button;
