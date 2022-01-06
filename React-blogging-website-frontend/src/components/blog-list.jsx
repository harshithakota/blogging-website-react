import React, { useState, useEffect } from 'react';
import './blog-list.css';
import { Link } from "react-router-dom";
import BlogDataService from "../services/BlogService";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Post from "./post.jsx"
import Pagination from "./pagination.jsx"
import ReactPaginate from 'react-paginate';


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

      <div>
       {blogs.length > 0 ? (
         <>
           <Pagination
             data={blogs}
             RenderComponent={Post}
             title="Posts"
             pageLimit={5}
             dataLimit={10}
           />
         </>
       ) : (
        <h1>No Posts to display</h1>
       )}
     </div>

      </div>
   );

}

export default BlogList;
