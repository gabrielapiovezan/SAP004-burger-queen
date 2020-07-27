import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { authRegister } from "../../firebase/authService";
import Button from "../../components/Button";
import Input from "../../components/Input";
import logo from "../../img/logo1.png";
import chapeu1 from "../../img/chapeu-1.png";
import chapeu2 from "../../img/chapeu-2.png";
import cozinha1 from "../../img/cozinha-1.png";
import cozinha2 from "../../img/cozinha-2.png";

import "./style.css";

// const email = "ma@ma.com";
// const password = "123456";

// const register = (email, password) => {
// if (user.userName && user.profession) {
// firebase.auth().createUserWithEmailAndPassword(email, password);
// .then(function() {
//     firebase.auth().currentUser.updateProfile({
//         displayName: user.userName,
//     });
// user.userUid = firebase.auth().currentUser.uid;
//     // firebase.firestore().collection('users').add(user);
// })
// } else {
//   printErrorLogin("Digite todos os campos");
// }
// };

// import firebase from '../../firebase/firebase';
// const email = "ma@ma.com";
// const password = "123456";
// firebase
//   .auth()
//   .createUserWithEmailAndPassword(email, password);

const Register = () => {
  const history = useHistory();
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [type, setType] = useState("");

  const onClickRegister = async () => {
    if (password !== confirmPassword) {
      alert("email e senhao não sao iguis")
    }
    else {
      try {
        const response = await authRegister({ name, email, password, type });
        console.log(response)
      } catch (error) {
        setError(error.code);
      }
    }
  };


  return (
    <div className="templateAuth">
      <img className="img" src={logo} alt="logo" />
      <h2>Cadastro</h2>
      <Input type="text" placeholder="Nome*" onChange={(e) => setName(e.target.value)} required />
      <Input type="text" placeholder="Email*" onChange={(e) => setEmail(e.target.value)} required />
      <Input type="password" placeholder="Senha*" onChange={(e) => setPassword(e.target.value)} required />
      <Input type="password" placeholder="Confirmar Senha*" onChange={(e) => setConfirmPassword(e.target.value)} required />
      <div className="oi">
        <span className="sector" onChange={(e) => setType(e.target.value)} onClick={() => setType("kitchen")} >
          <img src={type === "kitchen" ? chapeu2 : chapeu1} className="icon" />
        Cozinha
      </span>
        <span className="sector" onChange={(e) => setType(e.target.value)} onClick={() => setType("service")}  >
          <img src={type === "service" ? cozinha2 : cozinha1} className="icon" />
        Salão
      </span>
      </div>
      <Button value="Entrar" onClick={onClickRegister} />
      <span>
        Possui Cadastro?{" "}
        <Link className="link" to="/login"> Login </Link>
      </span>
    </div>
  );
};

export default Register;
