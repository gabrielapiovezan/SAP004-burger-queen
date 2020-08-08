import React, { useState, useEffect } from "react";
import logo from "../../img/logo2.png";
import "./style.css";
import { getDataByStatus, notifyHall } from "../../firebase/firebaseService";
import { useAuth } from "../../contexts/auth";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";

const Header = () => {
  const { signOut, signed, user } = useAuth();
  const [setError] = useState("");
  const [requests, setRequests] = useState(0);

  useEffect(() => {
    function get(data) {
      setRequests(data.length);
    }
    getDataByStatus(get, 2);
  }, []);

  useEffect(() => {
    function get(data) {
      if (data)
        toast.warn(`O Pedido do Cliente: ${data.value[0].name} da Mesa: ${data.value[0].table} está pronto`);
    }
    if (user && user.type === "service") {
      notifyHall(get);
    }
  }, [user]);

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
          {user.type === "service" ? <span>{requests}</span> : null}
          <nav>
            <div id="menuToggle">
              <input type="checkbox" />
              <span></span>
              <span></span>
              <span></span>
              <ul id="menu">
                <Link to="/">
                  <li>Home</li>
                </Link>
                {/* <Link href="#"><li>Perfil</li></Link> */}
                {user.type === "service" ? (
                  <Link to="/delivery">
                    <li>Pedidos</li>
                  </Link>
                ) : null}
                <Link to="/orderHistory">
                  <li>Histórico</li>
                </Link>
                <a onClick={handleLogout}>
                  <li>Sair</li>
                </a>
              </ul>
            </div>
          </nav>
          <div className="logo-header">
            <span>Burguer Queen</span>
            <img className="img" src={logo} alt="logo" />
          </div>
        </div>
      </>
    );
  } else return null;
};
export default Header;
