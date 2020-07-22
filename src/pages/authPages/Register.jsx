import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { authRegister } from "../../firebase/authService";
import Button from "../../components/Button";
import Input from "../../components/Input";
import logo from "../../img/logo1.png";
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
      <span className="sector" onChange={(e) => setType(e.target.value)} onClick={() => setType("kitchen")} >
        <img src={type === "kitchen" ? "https://img.icons8.com/ios-filled/30/000000/chef-hat.png" : "https://img.icons8.com/ios/30/000000/chef-hat.png"} />
        Cozinha
      </span>
      <span className="sector" onChange={(e) => setType(e.target.value)} onClick={() => setType("service")}  >
        <img src={type === "service" ? "https://img.icons8.com/ios-filled/30/000000/waiter.png" : "https://img.icons8.com/ios/30/000500/waiter.png"} />
        Salão
      </span>
      <Button value="Entrar" onClick={onClickRegister} />
      <span>
        <Link className="link" to="/login">
          Login
          </Link>
      </span>
    </div>
  );
};

export default Register;
