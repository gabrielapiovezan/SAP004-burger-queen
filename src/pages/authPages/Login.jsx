import React, { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";

import { useAuth } from "../../contexts/auth";

import { Link } from "react-router-dom";

import logo from "../../img/logo1.png";
import ReturnError from "./authError";
import "./style.css";

const App = () => {
  const { signIn } = useAuth();
  const [error, setError] = useState("");
  const [data, setData] = useState({ email: "", password: "" });

  const onClickLogin = async () => {
    try {
      await signIn(data.email, data.password);
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
      <img className="img-auth" src={logo} alt="logo" />
      <div className="form-auth">
        <h2>Bem Vindo(a)!</h2>
        <Input
          type="email"
          placeholder="Email*"
          onChange={(e) => onChangeEmail(e)}
          required
        />
        <Input
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
    </div>
  );
};

export default App;
