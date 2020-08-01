import React from "react";
import "./style.css";

// class Button extends React.Component {
//   render() {
const ButtonIcon = (props) => {
  return (
    <div
      className="button-icon-div"
      onClick={() => props.func(props.product, props.type, props.index)}
    >
      <img src={props.img} className="button-icon" />
      {props.name}
    </div>
  );
};
//}

export default ButtonIcon;
