import React from "react";
import "./input.css";
import "./style.css";
class Input extends React.Component {
  render() {
    return (
      <input
        type={this.props.type}
        className={`input ${this.props.className} `}
        placeholder={this.props.placeholder}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}

export default Input;
