import React from "react";

const ReturnError = (props) => {

  const errorAuth = (errorCode) => {
    if (errorCode === "") {
      return ""
    }
    switch (errorCode) {
      case "auth/email-already-exists":
      case "auth/email-already-in-use":
        return "O e-mail fornecido já está em uso por outro usuário. ";
      case "auth/invalid-email":
        return "E-mail inválido. Favor inserir um e-mail válido.";
      case "auth/wrong-password":
        return "A senha atual está incorreta.";
      case "auth/user-not-found":
        return "Usuário não encontrado."
      case "auth/weak-password":
        return "A senha deve ter mais de seis caracteres."
      default:
        return "Ocorreu um erro no sistema"
    }
  };

  return <div className="error">{errorAuth(props.error)}</div>;
};
export default ReturnError;

