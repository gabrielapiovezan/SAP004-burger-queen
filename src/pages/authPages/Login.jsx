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
  const [data, setData] = useState({ email: "", password: "" });

  const onClickLogin = () => {
    //chamar firebase com a resposta data.erro
    console.log(data.email, data.password);
    setError("auth/weak-password");

    //history.push("/register")
  };
  const onChangeEmail = (event) =>
    setData({ ...data, email: event.target.value });

  const onChangePassword = (event) =>
    setData({ ...data, password: event.target.value });

  return (
    <div className="templateAuth">
      <img className="img" src={logo} alt="logo" />
      <h2>Bem Vindo(a)!</h2>
      <Input
        className="input input-auth"
        type="email"
        placeholder="Email*"
        onChange={(e) => onChangeEmail(e)}
        required
      />
      <Input
        className="input input-auth"
        type="password"
        placeholder="Senha*"
        onChange={(e) => onChangePassword(e)}
        required
      />
      <ReturnError error={error} />
      <Button
        className="button button-auth"
        value="Entrar"
        onClick={onClickLogin}
      />
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
