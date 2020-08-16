import React, { useState, useEffect } from "react";
import logo from "../../img/logo2.png";
import { Link, } from "react-router-dom";
import Bag from "../../img/bag.png";
import "./style.css";
import { useAuth } from "../../contexts/auth";

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
    this._menuToggle = this._menuToggle.bind(this);
    this._handleDocumentClick = this._handleDocumentClick.bind(this);
  }
  componentDidMount() {
    document.addEventListener('click', this._handleDocumentClick, false);
  }
  componentWillUnmount() {
    document.removeEventListener('click', this._handleDocumentClick, false);
  }
  _handleDocumentClick(e) {
    debugger;
    if (!this.refs.root.contains(e.target) && this.state.isOpen === true) {
      this.setState({
        isOpen: false
      });
    };
  }
  _menuToggle(e) {
    e.stopPropagation();
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  handleLogout = async () => {
    try {
      await signOut();
    } catch (error) { }
  };
  render() {
    let menuStatus = this.state.isOpen ? 'isopen' : '';

    const { signOut, signed, user } = useAuth();

    return (
      <div className="header" ref="root">
        <div className="menubar">
          <div className="hambclicker" onClick={this._menuToggle}></div>
          <div clasname="hambmenu" id="hambmenu" className={menuStatus}>
            <span></span><span></span><span></span><span></span>
          </div>
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
        <div className={this.props.menuStatus} id='menu'>
          <ul>
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
    )
  }
}


export default Menu

//ReactDOM.render(<Menu title='Title' />, document.getElementById('app'))
