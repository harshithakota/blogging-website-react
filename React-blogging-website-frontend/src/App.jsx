import React from "react"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/home.jsx"
import BlogDetail from "./components/blog-detail.jsx"
import Write from "./components/write.jsx"
import Header from "./components/layout/header.jsx"
import Register from "./components/register.jsx"
import Login from "./components/login.jsx"
import { useEffect,useState } from 'react';

import "bootstrap/dist/css/bootstrap.min.css";



function App(){

  const [ user, setLoginUser] = useState({})

  useEffect(() => {
    setLoginUser(JSON.parse(localStorage.getItem("MyUser")))
  }, [])

  const updateUser = (user) => {
    localStorage.setItem("MyUser", JSON.stringify(user))
    setLoginUser(user)
  }

  return <div>
  <Header updateUser={updateUser}/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="blog-details/:id" element={<BlogDetail />} />
      <Route path="write" element={<Write />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login updateUser={updateUser}/>} />
    </Routes>

  </div>
}



export default App;
