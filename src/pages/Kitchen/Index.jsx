import React, { useState, useEffect } from "react";
import logo from "../../img/logo1.png";
import Button from "../../components/Button";
import Modal from "../../components/Modal/Index";
import Command from "../../components/CommandNew";
import { getDataByStatus, updateData } from "../../firebase/firebaseService";
import "./style.css";

const Kitchen = () => {
  const [itemSelected, setitemSelected] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    function get(data) {
      setRequests(data)
    }
    getDataByStatus(get, 1)
  }, []);

  const handleModal = (request) => {
    setitemSelected(request)
    setShowModal(true)
  }
  const handleCancel = () => {
    setShowModal(false)
  }
  const handleFinish = () => {
    console.log(itemSelected)
    updateData(itemSelected.id, {
      status: 2,
      dateDelivery: new Date()
    })
    setShowModal(false)
  }

  return (
    <div className="container">
      <div className="kitchen">
        <img className="img-kitchen" src={logo} alt="logo" />
        <Button value="Pedidos" />
      </div>
      <div className="request" >
        {requests.map(request =>
          <Command key={request.id} request={request} onClick={() => handleModal(request)} />
        )}
      </div>
      <Modal show={showModal} onCancel={handleCancel} onFinish={handleFinish} />
    </div>
  )
};

export default Kitchen;