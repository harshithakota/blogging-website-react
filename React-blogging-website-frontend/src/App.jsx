import React from "react"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/home.jsx"
import BlogDetail from "./components/blog-detail.jsx"
import Write from "./components/write.jsx"
import Header from "./components/layout/header.jsx"
import Register from "./components/register.jsx"
import Login from "./components/login.jsx"
import { useState } from 'react';

import "bootstrap/dist/css/bootstrap.min.css";



function App(){

  const [ user, setLoginUser] = useState({})
  return <div>
  <Header setLoginUser={setLoginUser}/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="blog-details/:id" element={<BlogDetail />} />
      <Route path="write-article" element={<Write />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login setLoginUser={setLoginUser}/>} />
    </Routes>

  </div>
}



export default App;
