import React, { useState, useEffect } from "react";
import logo from "../../img/logo2.png";
import "./style.css";
import {
  getDataByStatus,
  notifyHall,
} from "../../firebase/firebaseService";
import { useAuth } from "../../contexts/auth";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import Bag from "../../img/bag.png";

const Header = () => {
  const history = useHistory();
  const { signOut, signed, user } = useAuth();
  const [open, setOpen] = useState(false);
  const [requests, setRequests] = useState(0);

  const togleOpen = (e) => {
    if (open)
      setOpen(false);
    console.log(open)
  }
  useEffect(() => {
    window.addEventListener('click', togleOpen, false);
    return () => window.removeEventListener('click', togleOpen);
  }, [open]);

  useEffect(() => {
    function get(data) {
      setRequests(data.length);
    }
    getDataByStatus(get, 2);
    // getDataAll(time);
  }, []);

  const onClickDelivery = () => {
    history.push("/delivery");
  }

  useEffect(() => {
    function get(data) {
      if (data)
        toast.warn(
          `O Pedido do Cliente: ${data.name} da Mesa: ${data.table} está pronto`
        );
    }
    if (user && user.type === "service") {
      notifyHall(get);
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {

    }
  };
  const openMenu = () => {
    setOpen(true);
    console.log(open)
  }
  if (signed === true) {
    return (
      <>
        <div className="header">
          <nav>
            <div id="menuToggle">
              <input type="checkbox" onClick={() => openMenu()} />
              <span></span>
              <span></span>
              <span></span>
              <ul id="menu" className={open ? "tras" : ""}>
                {user.type === "service" ? (
                  <>
                    <Link to="/delivery">
                      <li>Entrega</li>
                    </Link>
                    <Link to="/hall">
                      <li>Pedido</li>
                    </Link>
                  </>
                ) : null}
                <Link to="/">
                  <li>Cozinha</li>
                </Link>
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
          {}
          {user.type === "service" ? (
            <div className="box-bag" onClick={onClickDelivery}>
              <img src={Bag} className="bag" />
              <span className="orders">{requests}</span>
            </div>
          ) : null}
        </div>
      </>
    );
  } else return null;
};
export default Header;
