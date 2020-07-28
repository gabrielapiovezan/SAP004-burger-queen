import React, { useState } from "react";
import "./buttonSelector.css";

const ButtonSelector = (props) => {
  const [value, setValue] = useState(props.value);
  // const [total, setTotal] = useState([]);

  // const onChangeValue = () => {
  //   setTotal([...total, props.index]);
  //   console.log(total);
  // };
  // props.menu.category === "Total" ?
  // console.log(props.menu[props.index].category); //: "";
  const less = async () => {
    await setValue(value > 1 ? value - 1 : 0);

    props.func(props.index, props.menu, props.value);
    // onChangeValue();
  };
  const more = async () => {
    await setValue(value < 20 ? value + 1 : 20);
    // if (props.menu[props.index].category === "Total")
    props.func(props.index, props.menu, props.value);
    // onChangeValue();
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
        //  onChange={(e) => onChangeValue(e)}
      />
      <button onClick={more} className="button-change">
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
