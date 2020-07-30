import React, { useState } from "react";
import logo from "../../img/logo2.png";
import "./style.css"

import { useAuth } from "../../contexts/auth";


const Header = () => {
  const { signOut, signed } = useAuth();
  const [setError] = useState("");

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      setError(error);
    }
  };

  if (signed === true) {
    return (
      <>
        <div className="header">
          <nav>
            <div id="menuToggle">
              <input type="checkbox" />
              <span></span>
              <span></span>
              <span></span>
              <ul id="menu">
                <a href="#"><li>Perfil</li></a>
                <a href="#"><li>Pedidos</li></a>
                <a onClick={handleLogout}><li>Sair</li></a>
              </ul>
            </div>
          </nav>
          <div className="logo-header">
            <span>Burguer Queem</span>
            <img className="img" src={logo} alt="logo" />
          </div>
        </div>
      </>
    );
  } else return null;
};
export default Header;
