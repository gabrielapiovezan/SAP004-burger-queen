import React, { useState } from "react";
import "./buttonSelector.css";

const ButtonSelector = () => {
  const [value, setValue] = useState(0);

  const less = () => setValue(value > 1 ? value - 1 : 0);
  const more = () => setValue(value < 20 ? value + 1 : 20);

  return (
    <div className="button-selector">
      <button onClick={less} className="button-change">
        -
      </button>
      <input className="input-button-selector" type="number" value={value} />
      <button onClick={more} className="button-change">
        +
      </button>
    </div>
  );
};

export default ButtonSelector;
