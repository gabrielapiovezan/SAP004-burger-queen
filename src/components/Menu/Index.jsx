import React, { useState, useEffect, useRef } from "react";
import logo from "../../img/logo2.png";
import "./style.css";

class MenuLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [{
        text: 'Author',
        link: 'https://github.com/Lakston',
        icon: 'fa-pencil-square-o'
      }, {
        text: 'Github page',
        link: 'https://github.com/Lakston',
        icon: 'fa-github'
      }, {
        text: 'Twitter',
        link: 'https://twitter.com/Fab_is_coding',
        icon: 'fa-twitter'
      }]
    }
  }

  render() {
    let links = this.state.links.map((link, i) =>
      <li ref={i + 1}>
        <i aria-hidden="true" className={`fa ${link.icon}`}></i>
        <a href={link.link} target="_blank">{link.text}</a>
      </li>);

    return (
      <div className={this.props.menuStatus} id='menu'>
        <ul>
          {links}
        </ul>
      </div>
    )
  }
}

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
  render() {
    let menuStatus = this.state.isOpen ? 'isopen' : '';

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
        </div>
        <MenuLinks menuStatus={menuStatus} />
      </div>
    )
  }
}


export default Menu

//ReactDOM.render(<Menu title='Title' />, document.getElementById('app'))
