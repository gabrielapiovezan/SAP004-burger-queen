import React, { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { Link } from "react-router-dom";
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
  {
    //  const [email] = useState("");

    //  const [password, setPassword] = useState("");
    // const onClickLogin = () => {
    //   console.log(password);
    // };

    return (
      <div className="templateAuth">
        <img className="img" src={logo} alt="logo" />
        <h2>Cadastro</h2>
        <Input
          // onChange={(e) => setPassword(e.target.value)}
          type="text"
          placeholder="Nome*"
        />
        <Input type="text" placeholder="Email*" />
        <Input type="text" placeholder="Senha*" />
        <Input type="text" placeholder="Senha*" />
        <Button value="Entrar" />
        <span>
          <Link className="link" to="/login">
            Login
          </Link>
        </span>
      </div>
    );
  }
};

export default Register;
