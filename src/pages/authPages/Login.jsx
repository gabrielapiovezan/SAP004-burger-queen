import React, { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { Link, useHistory } from "react-router-dom";
import logo from "../../img/logo1.png";
import ReturnError from "./authError";
import "./style.css";

// import firebase from '../../firebase/firebase';
// const email = "ma@ma.com";
// const password = "123456";
// firebase
//   .auth()
//   .createUserWithEmailAndPassword(email, password);

const App = () => {
  const history = useHistory();
  const [error, setError] = useState("");

  const onClickLogin = () => {

    //chamar firebase com a resposta data.erro

    setError("auth/weak-password")
    //history.push("/register")
  }

  return (
    <div className="templateAuth">
      <img className="img" src={logo} alt="logo" />
      <h2>Bem Vindo(a)!</h2>
      <Input type="text" placeholder="Email*" />
      <Input type="text" placeholder="Senha*" />
      <ReturnError error={error} />
      <Button value="Entrar" onClick={onClickLogin} />
      <span>
        Não possui uma conta?{" "}
        <Link className="link" to="/register">
          Cadastre-se
        </Link>
      </span>
    </div>
  );
};

export default App;
