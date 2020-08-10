import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../components/Button";
import Command from "../../components/Command/Index";
import { getData } from "../../firebase/firebaseService";
import Flatpickr from 'react-flatpickr'
import "./style.css";

const OrderHistory = () => {
  const history = useHistory();
  const [requests, setRequests] = useState([]);
  const [calendar, setCalendar] = useState(new Date());

  useEffect(() => {
    function get(data) {
      setRequests(data)
    }
    getData(calendar, get)
  }, [calendar]);

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
        <Flatpickr className="input calendar"
          onChange={(e) => setCalendar(e[0])}
          // onChange={ item setCalendar}
          value={calendar}
        />
      </div>
      <div className="request">
        {array.map((request) => (
          <Command
            request={request}
            data={request.dateDelivery} />
        ))}
      </div>
      {/* <img src={Onion} className="onion" /> */}
    </div>
  );
};

export default OrderHistory;
