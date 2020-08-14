import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { authRegister } from "../../firebase/authService";
import Button from "../../components/Button";
import Input from "../../components/Input";
import ReturnError from "./authError";
import { toast } from "react-toastify";
import logo from "../../img/logo1.png";
import Img1 from "../../img/mordida-1.png";
import Img2 from "../../img/mordida-2.png";
import Img3 from "../../img/mordida-3.png";
import chapeu1 from "../../img/chapeu-1.png";
import chapeu2 from "../../img/chapeu-2.png";
import cozinha1 from "../../img/cozinha-1.png";
import cozinha2 from "../../img/cozinha-2.png";

import "./style.css";

const Register = () => {
  const history = useHistory();
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [type, setType] = useState("");
  const [animation, setAnimation] = useState(0);
  const onClickRegister = async () => {
    if (type === "") {
      setError("Insira o tipo de serviço em que trabalha Cozinha/Salão");
      return;
    }
    if (name === "") {
      setError("Insira seu nome");
      return;
    }
    if (email === "") {
      setError("Insira seu e-mail");
      return;
    }
    if (password === "") {
      setError("Crie uma senha com mais de 6 digitos");
      return;
    }
    if (password !== confirmPassword) {
      setError("Confirme sua senha");
      return;
    }

    try {
      setAnimation(1);
      const response = await authRegister({ name, email, password, type });
      toast.success("Cadastro realizado com sucesso!");
      history.push("/login");
    } catch (error) {
      setError(error.code);
      setAnimation(0);
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
      <div className="form-auth">
        <h1>Cadastro</h1>
        <div className="radio-button">
          <span
            className="sector"
            onChange={(e) => setType(e.target.value)}
            onClick={() => setType("kitchen")}
          >
            <img
              src={type === "kitchen" ? chapeu2 : chapeu1}
              className="icon"
            />
            Cozinha
          </span>
          <span
            className="sector"
            onChange={(e) => setType(e.target.value)}
            onClick={() => setType("service")}
          >
            <img
              src={type === "service" ? cozinha2 : cozinha1}
              className="icon"
            />
            Salão
          </span>
        </div>
        <Input
          type="text"
          placeholder="Nome*"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="text"
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
        <Input
          type="password"
          placeholder="Confirmar Senha*"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <ReturnError error={error} />
        <Button value="Entrar" onClick={onClickRegister} />
        <span>
          Possui Cadastro?{" "}
          <Link className="link" to="/login">
            {" "}
            Login{" "}
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
