import React, { useState, useEffect, useRef } from "react";
import logo from "../../img/logo2.png";
import "./style.css";
import { getDataByStatus, notifyHall } from "../../firebase/firebaseService";
import { useAuth } from "../../contexts/auth";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import Bag from "../../img/bag.png";

const Header = () => {
  const history = useHistory();
  const headerEl = useRef(null);

  const { signOut, signed, user } = useAuth();
  const [open, setOpen] = useState(false);
  const [requests, setRequests] = useState(0);

  const togleOpen = (e) => {
    debugger;
    if (headerEl.current && !headerEl.current.contains(e.target) && open === true) {
      setOpen(false);
    };
  };
  useEffect(() => {
    window.addEventListener("click", togleOpen, false);
    return () => window.removeEventListener("click", togleOpen);
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
  };

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
    } catch (error) { }
  };
  const openMenu = () => {
    setOpen(!open);
  };
  if (signed === true) {
    return (
      <>
        <div className="header" ref={headerEl} >
          <nav>
            <div id="menuToggle">
              <div onClick={() => openMenu()} className={open ? "open" : ""} >
                <span></span>
                <span></span>
                <span></span>
              </div>
              <ul id="menu" className={open ? "open" : ""}>
                {user.type === "service" ? (
                  <>
                    <li><Link to="/">Entrega</Link></li>
                    <li><Link to="/hall">Pedido</Link></li>
                  </>
                ) : (
                    <li><Link to="/">Cozinha</Link></li>
                  )}
                <li><Link to="/orderHistory">Histórico</Link></li>
                <li><a onClick={handleLogout}>Sair</a></li>
              </ul>
            </div>
          </nav>
          <div className="logo-header">
            <span>Burguer Queen</span>
            <img className="img" src={logo} alt="logo" />
          </div>
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
