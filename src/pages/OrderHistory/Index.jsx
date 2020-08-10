import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../components/Button";
import logo from "../../img/logo1.png";

import Command from "../../components/Command/Index";
import { getData } from "../../firebase/firebaseService";
import "./style.css";

const OrderHistory = () => {
  const history = useHistory();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    function get(data) {
      setRequests(data);
    }
    getData(get);
  }, []);

  const onClickBack = () => {
    history.push("/");
  };
  const orderByDate = (a, b) => {
    return a.requestDate - b.requestDate;
  };
  let array = requests;
  array.sort(orderByDate);

  console.log(array);
  return (
    <div className="container">
      <Button
        className="button button-history"
        value="Voltar"
        onClick={onClickBack}
      />
      <div className="container-history">
        {/* <img className="img-history" src={logo} alt="logo" /> */}
        {/* <span>Calendario</span> */}
      </div>
      <div className="request">
        {array.map((request) => (
          <Command request={request} />
        ))}
      </div>
      {/* <img src={Onion} className="onion" /> */}
    </div>
  );
};

export default OrderHistory;
