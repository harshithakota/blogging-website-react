import React from "react"
import './header.css';
import { Link } from "react-router-dom";
import { useEffect,useState } from 'react';

function Header({updateUser}){
  const user = JSON.parse(localStorage.getItem("MyUser"))
  // console.log(user.name)

  return <div>
    <header className="wrapper">
          <div className="left">
          <img style={{marginLeft: "40px"}} src="images/logo.png" alt="" />
          </div>
          <div className="right">
            <div>
            {user.name?
              <div className="items">
              <div className="header-start" ><button style={{paddingBottom:'7px',paddingTop:'7px'}} className="button-start"><Link to="/write" style={{color:'inherit'}} >Get Started, {user.name}</Link></button></div>
              <div style={{paddingLeft:'30px'}}><div className="button" onClick={() => updateUser({})} >Logout</div></div></div>
:<div className="items"><div className="header-sign"><Link to="register" style={{color:'inherit'}}>Sign in</Link></div>
<div className="header-log"><Link to="login" style={{color:'inherit'}}>Log in</Link></div></div>
 }


            </div>
          </div>
        </header>
        <div className="line"></div>
        </div>
}


export default Header;
