import React, { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";

import { useAuth } from "../../contexts/auth";

import { Link } from "react-router-dom";

import logo from "../../img/logo1.png";
import Img1 from "../../img/mordida-1.png";
import Img2 from "../../img/mordida-2.png";
import Img3 from "../../img/mordida-3.png";
import Burguer from "../../img/burguer.gif";
import ReturnError from "./authError";
import "./style.css";

const App = () => {
  const { signIn } = useAuth();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [animation, setAnimation] = useState(0);
  const onClickLogin = async () => {
    if (email === "") {
      setError("Insira seu e-mail");
      return;
    }
    if (password === "") {
      setError("Insira sua senha");
      return;
    }

    try {
      setAnimation(1);
      await signIn(email, password);
    } catch (error) {
      setError(error.code);
      Animation();
    }
  };

  return (
    <div className="templateAuth">
      {animation ? (
        <div className="box-imgs">
          <img src={Img1} alt="logo" />
          <img src={Img2} alt="logo" />
          <img src={Img3} alt="logo" />
        </div>
      ) : (
        <img className="img-auth" src={logo} alt="logo" />
      )}
      {/* <img className="img-auth" src={gif ? Burguer : logo} alt="logo" /> */}
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
