import React, { useState, useEffect } from "react";
import logo from "../../img/logo1.png";
import Button from "../../components/Button";
import Command from "../../components/CommandNew";
import { getData } from "../../firebase/firebaseService";
import "./style.css";

const OrderHistory = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    function get(data) {
      setRequests(data)
    }
    getData(get)
  }, []);


  return (
    <div className="container">
      <div className="kitchen">
        <img className="img-kitchen" src={logo} alt="logo" />
      </div>
      <div className="request" >
        {requests.map(request =>
          <Command request={request} />
        )}
      </div>
    </div>
  )
};

export default OrderHistory;