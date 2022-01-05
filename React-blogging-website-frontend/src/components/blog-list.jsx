import React, { useState, useEffect } from 'react';
import './blog-list.css';
import { Link } from "react-router-dom";
import BlogDataService from "../services/BlogService";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function BlogList(props) {

  const [blogs, setBlogsList] = useState([]);

  useEffect(() => {

    BlogDataService.getAll()
        .then(response => {
          setBlogsList(response.data);
        })
        .catch(e => {
          console.log(e);
        });

  }, []);




  const history = useNavigate()

  const [ tag_blog, setTag] = useState({
      tag:""
  })

  const handleChange = e => {
      const { name, value } = e.target
      setTag({
          ...tag_blog,
          [name]: value
      })
  }

  const handleSubmit = () => {
      const {tag} = tag_blog
      if( tag){
        console.log(tag)
          axios.get(`http://localhost:9002/searchtag/${tag}`)
          .then( res => {
            setBlogsList(res.data);
              console.log(res.data)
              // history("/")
          })
      } else {
          alert("invlid input")
      }

  }




   return (
     <div>
     <div class="sb-example-1">

         <div class="search">
         <>
        <input type="text" class="searchTerm" name="tag" value={tag_blog.tag} placeholder="What are you looking for?"  onChange={handleChange} />
      <br />
      <button onClick={handleSubmit}>Search</button>
    </>

         </div>

      </div>

     <div className="list-group">
        {blogs &&
          blogs.map((blog, index) => (
            <div key={index}>
              <div className="author">
                Written by Claire
              </div>
              <div className="blog-title">
                <b><Link to={`/blog-details/${blog._id}`}>
                {blog.title}
                </Link></b>
              </div>
              <div className="blog-date">
                Oct 20
              </div>
            </div>
          ))}
      </div>
      </div>
   );

}

export default BlogList;
