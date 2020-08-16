import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../components/Button";
import Command from "../../components/Command/Index";
import { getData } from "../../firebase/firebaseService";
import Flatpickr from "react-flatpickr";
import flatpickr from "flatpickr";
import { Portuguese } from "flatpickr/dist/l10n/pt";

import logo from "../../img/logo3.png";
import "./style.css";

flatpickr.localize(Portuguese);
const OrderHistory = () => {
  const history = useHistory();
  const [requests, setRequests] = useState([]);
  const [status, setStatus] = useState(null);
  const [calendarStart, setCalendarStart] = useState(new Date());
  const [calendarFinish, setCalendarFinish] = useState(new Date());

  function getCalback(data) {
    setRequests(data);
  }

  useEffect(() => {
    getData(calendarStart, calendarFinish, status, getCalback);
  }, [calendarStart, calendarFinish, status]);

  const onClickBack = () => {
    history.push("/");
  };

  return (
    <div className="container">
      <Button
        className="button button-history"
        value="Voltar"
        onClick={onClickBack}
      />
      <div className="history">
        <img className="img-history" src={logo} alt="logo" />
        <div className="history-style">
          <div>
            Data inicio:{" "}
            <Flatpickr
              className="calendar"
              onChange={(e) => setCalendarStart(e[0])}
              value={calendarStart}
            />
          </div>
          <div>
            Data final:{" "}
            <Flatpickr
              className="calendar"
              onChange={(e) => setCalendarFinish(e[0])}
              value={calendarFinish}
            />
          </div>

          <select
            className="calendar select"
            name="select"
            onChange={(e) => setStatus(Number(e.target.value) || null)}
          >
            <option value={""}>Todos</option>
            <option value={2}>Para Entrega</option>
            <option value={1}>Em Preparo</option>
            <option value={3}>Finalizado</option>
          </select>
        </div>
      </div>
      <div className="request">
        {requests.map((request) => (
          <Command
            requests={requests}
            request={request}
            date={request.requestDate}
            command={"command-box"}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
