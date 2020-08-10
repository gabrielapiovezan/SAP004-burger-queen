import React, { useState, useEffect } from "react";
import Modal from "../../components/Modal/Index";
import Command from "../../components/Command/Index";
import { getDataByStatus, updateData } from "../../firebase/firebaseService";
import "./style.css";

const Kitchen = () => {
  const [itemSelected, setitemSelected] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    function get(data) {
      setRequests(data);
    }
    getDataByStatus(get, 1);
  }, []);

  const handleModal = (request) => {
    setitemSelected(request);
    setShowModal(true);
  };
  const handleCancel = () => {
    setShowModal(false);
  };
  const handleFinish = () => {
    console.log(itemSelected);
    updateData(itemSelected.id, {
      status: 2,
      dateDelivery: new Date(),
    });
    setShowModal(false);
  };
  const orderByDate = (a, b) => {
    return a.requestDate - b.requestDate;
  };
  let array = requests;
  array.sort(orderByDate);
  return (
    <div className="container">
      <div className="request">
        {array.map((request) => (
          <Command
            key={request.id}
            request={request}
            data={request.requestDate}
            onClick={() => handleModal(request)}
          />
        ))}
      </div>
      <Modal show={showModal} onCancel={handleCancel} onFinish={handleFinish} />
    </div>
  );
};

export default Kitchen;
