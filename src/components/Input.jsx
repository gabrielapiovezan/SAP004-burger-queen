import React from "react";
import "./style.css";
// class Input extends React.Component {
//   render() {
const Input = (props) => {
  return (
    <input
      className="input"
      {...props}

      // type={this.props.type}
      // className={`input ${this.props.className} `}
      // placeholder={this.props.placeholder}
      // value={this.props.value}
      // onChange={this.props.onChange}
    />
  );
};

export default Input;
