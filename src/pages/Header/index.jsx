import React, { useState, useEffect } from "react";
import logo from "../../img/logo2.png";
import "./style.css";
import {
  getDataByStatus,
  notifyHall,
  getDataAll,
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
  // const [averageTime, setAverageTime] = useState([]);

  const togleOpen = () => {
    setOpen(!open);
  }

  useEffect(() => {
    function get(data) {
      setRequests(data.length);
    }
    getDataByStatus(get, 2);
    // getDataAll(time);
    document.addEventListener('click', togleOpen, false);
  }, []);

  const onClickDelivery = () => {
    history.push("/delivery");
  }


  // const time = (itens) => {
  //   const array = itens.filter((a) => a.dateDelivery);
  //   if (array.length) {
  //     const average =
  //       array.reduce((accum, curr) => {
  //         return (
  //           accum +
  //           curr.dateDelivery.toDate().getTime() -
  //           curr.requestDate.toDate().getTime()
  //         );
  //       }, 0) / array.length;

  //     const hours = parseInt(average / 3600000);
  //     const min = parseInt((average % 3600000) / 60000);
  //     console.log((hours ? `${hours}h` : "") + `${min}min`);
  //   }
  //   setAverageTime(array);
  // };

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
              <ul id="menu" className={open ? "tras" : ""}>
                {/* <Link to="/">
                  <li>Home</li>
                </Link> */}
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
          <div className="box-bag" onClick={onClickDelivery}>
            <img src={Bag} className="bag" />
            {user.type === "service" ? (
              <span className="orders">{requests}</span>
            ) : null}
          </div>
        </div>
      </>
    );
  } else return null;
};
export default Header;
