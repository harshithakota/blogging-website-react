import React from "react"
import './home.css'
import BlogList from "./blog-list.jsx"
import { Link } from "react-router-dom";
//homepage
function Home(){
  const user = JSON.parse(localStorage.getItem("MyUser"))
  return <div>
    <div  className="home" >
      <div className="front">
        <div>
          <div className="main">
          Article Avenue is a<br/> place to write, read, <br/>and learn
          </div>

          <div className="sub">
          It's easy to post your knowledge on any topic and connect<br/> with millions of readers.
          </div>
          {user && user.name ? <div className="write"><button className="button-home"><Link to="blog-write" style={{color:'inherit'}}>Start Writing</Link></button></div> 
          : <div></div>}

        </div>
        <div className="image"><img src="images/home-image.png" alt="" /></div>
      </div>
    </div>
    <div className="line-home"></div>
    <BlogList/>
  </div>
}

export default Home;
