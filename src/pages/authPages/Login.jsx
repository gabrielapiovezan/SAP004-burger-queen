import React, { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";

import { useAuth } from "../../contexts/auth"

import { authLoginEmail } from "../../firebase/authService.js"
import { Link, useHistory } from "react-router-dom";
import logo from "../../img/logo1.png";
import ReturnError from "./authError";
import "./style.css";

const App = () => {
  const history = useHistory();
  const { signIn } = useAuth()
  const [error, setError] = useState("");
  const [data, setData] = useState({ email: "", password: "" });

  const onClickLogin = async () => {
    try {
      await signIn(data.email, data.password);
      // history.push("/")
    } catch (error) {
      setError(error.code);
    }
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
