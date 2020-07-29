import React, { useState, useEffect } from "react";
import "./buttonSelector.css";

const ButtonSelector = (props) => {
  const [value, setValue] = useState(props.product.amount);

  useEffect(() => {
    if (!value) console.log("deletou");
  }, [value]);

  useEffect(() => {
    value
      ? props.func[0](props.index, props.menu, value)
      : props.func[1](props.product.item);
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
