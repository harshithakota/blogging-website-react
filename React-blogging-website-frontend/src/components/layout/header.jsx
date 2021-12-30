import React from "react"
import './header.css';
import { Link } from "react-router-dom";

function Header({setLoginUser}){
  return <div>
    <header className="wrapper">
          <div className="left">
          <img style={{marginLeft: "40px"}} src="images/logo.png" alt="" />
          </div>
          <div className="right">
            <div className="items">
              <div className="header-sign"><Link to="register" style={{color:'inherit'}}>Sign in</Link></div>
              <div className="header-log"><Link to="login" style={{color:'inherit'}}>Log in</Link></div>
              <div className="header-start" ><button style={{paddingBottom:'7px',paddingTop:'7px'}} className="button-start">Get Started</button></div>
              <div className="button" onClick={() => setLoginUser({})} >Logout</div>
            </div>
          </div>
        </header>
        <div className="line"></div>
        </div>
}

export default Header;
