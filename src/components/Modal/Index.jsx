import React, { useState } from "react";
import Button from "../../components/Button";
import "./style.css"

const Modal = ({ show, onCancel, onFinish }) => {

  return (
    <div className={`modal ${show === true ? "" : "hide"}`}>
      <div className="modal-content">
        <span className="close close-modal" onClick={onCancel} >&times;</span>
        <h2>Deseja Finalizar se?</h2>
        <Button value="Cancelar" onClick={onCancel} />
        <Button value="Finalizar" onClick={onFinish} />
      </div>
    </div>
  )

};
export default Modal;





