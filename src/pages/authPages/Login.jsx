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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onClickLogin = async () => {
    if (email === "") {
      setError("Insira seu e-mail")
      return
    }
    if (password === "") {
      setError("Insira sua senha")
      return
    }

    try {
      await signIn(email, password);
    } catch (error) {
      setError(error.code);
    }
  };


  return (
    <div className="templateAuth">
      <img className="img-auth" src={logo} alt="logo" />
      <div className="form-auth">
        <h2>Bem Vindo(a)!</h2>
        <Input
          type="email"
          placeholder="Email*"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Senha*"
          onChange={(e) => setPassword(e.target.value)}
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
