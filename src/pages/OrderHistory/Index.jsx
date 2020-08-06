import React, { useState, useEffect } from "react";
import Command from "../../components/Command/Index";
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
      <div className="request" >
        {requests.map(request =>
          <Command request={request} />
        )}
      </div>
    </div>
  )
};

export default OrderHistory;