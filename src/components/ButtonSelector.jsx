import React, { useState, useEffect } from "react";
import "./buttonSelector.css";

const ButtonSelector = (props) => {
  const [value, setValue] = useState(props.product.amount);

  // const less = () => {
  //   setValue(value > 1 ? value - 1 : 0);

  // };

  const more = () => {
    setValue(value < 20 ? value + 1 : 20);
  };

  useEffect(() => {
    props.func(props.index, props.menu, value);
  }, [value]);

  return (
    <div className={"button-selector " + props.className}>
      <button
        onClick={() => setValue(value > 1 ? value - 1 : 0)}
        className="button-change"
      >
        -
      </button>
      <input
        className="input-button-selector"
        type="number"
        value={value}
        //  onChange={(e) => onChangeValue(e)}
      />
      <button
        onClick={() => setValue(value < 20 ? value + 1 : 20)}
        className="button-change"
      >
        +
      </button>
      {/* <ul>
        {total.map((a) => (
          <li key={a.item}>{a.item}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default ButtonSelector;
