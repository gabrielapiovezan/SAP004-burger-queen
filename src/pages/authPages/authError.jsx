// import React from "react";

// const error = (errorCode) => {
//   errorCode === "auth/email-already-exists" ||
//   errorCode === "auth/email-already-in-use"
//     ? (errorCode = "O e-mail fornecido já está em uso por outro usuário. ")
//     : errorCode === "auth/invalid-email"
//     ? (errorCode = "E-mail inválido. Favor inserir um e-mail válido.")
//     : errorCode === "auth/wrong-password"
//     ? (errorCode = "A senha atual está incorreta.")
//     : errorCode === "auth/user-not-found"
//     ? (errorCode = "Usuário não encontrado.")
//     : errorCode === "auth/weak-password"
//     ? (errorCode = "A senha deve ter mais de seis caracteres.")
//     : "";
//   return errorCode;
// };

// const status = {
//   err: error(this.prompt.error),
// };
// console.log(status);
// // const ReturnError = (props) => {
// //   return <div>{props.error}</div>;
// // };
// // export default ReturnError;

// class ReturnError extends React.Component {
//   render() {
//     return (
//       <div></div>
//       // <button onClick={() => alert("funciona")}>{this.props.value}</button>
//     );
//   }
// }

// export default ReturnError;
