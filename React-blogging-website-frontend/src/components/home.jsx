import React from "react"
import './home.css'
import BlogList from "./blog-list.jsx"
import { Link } from "react-router-dom";
//homepage
function Home(){
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

          <div className="write"><button className="button-home"><Link to="write" style={{color:'inherit'}}>Start Writing</Link></button></div>
        </div>
        <div className="image"><img src="images/home-image.png" alt="" /></div>
      </div>
    </div>
    <div className="line-home"></div>
    <BlogList/>
  </div>
}

export default Home;
