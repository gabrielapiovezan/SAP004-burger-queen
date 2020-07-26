import React, { useState } from "react";
import "./buttonSelector.css";

const ButtonSelector = (props) => {
  const [value, setValue] = useState(0);
  const [total, setTotal] = useState([]);

  const onChangeValue = () => {
    setTotal({});
  };

  const less = () => {
    setValue(value > 1 ? value - 1 : 0);
    onChangeValue();
  };
  const more = () => {
    setValue(value < 20 ? value + 1 : 20);
    onChangeValue();
  };
  return (
    <div className={"button-selector " + props.className}>
      <button onClick={less} className="button-change">
        -
      </button>
      <input
        className="input-button-selector"
        type="number"
        value={value}
        onChange={(e) => onChangeValue(e)}
      />
      <button onClick={more} className="button-change">
        +
      </button>
    </div>
  );
};

export default ButtonSelector;
