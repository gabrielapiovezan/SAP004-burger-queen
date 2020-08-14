import React, { useState, useEffect } from "react";
import Modal from "../../components/Modal/Index";
import Command from "../../components/Command/Index";
import { getDataByStatus, updateData } from "../../firebase/firebaseService";
import logo from "../../img/logo1.png";
import Img1 from "../../img/mordida-1.png";
import Img2 from "../../img/mordida-2.png";
import Img3 from "../../img/mordida-3.png";
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
  // const orderByDate = (a, b) => {
  //   return a.requestDate - b.requestDate;
  // };
  // let array = requests;
  // array.sort(orderByDate);
  return (
    <div className="container">
      {!requests.length ? (
        <div className="not-orders">
          <div className="box-imgs-k">
            <img className="img" src={logo} alt="logo" />
            <img className="img" src={Img1} alt="logo" />
            <img className="img" src={Img2} alt="logo" />
            <img className="img" src={Img3} alt="logo" />
          </div>
          <span>Aguardando pedidos...</span>
        </div>
      ) : (
        <>
          <div className="request">
            {requests.map((request) => (
              <Command
                requests={requests}
                key={request.id}
                request={request}
                date={request.requestDate}
                onClick={() => handleModal(request)}
                // command={"command-box"}
              />
            ))}
          </div>
          <Modal
            show={showModal}
            onCancel={handleCancel}
            onFinish={handleFinish}
          />
        </>
      )}
    </div>
  );
};

export default Kitchen;
