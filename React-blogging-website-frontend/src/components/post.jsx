import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function Post(props) {
  const { _id,title } = props.data;
  return (
    <div className="list-group">
             <div className="author">
               Written by Claire
             </div>
             <div className="blog-title">
               <b><Link to={`/blog-details/${_id}`}>
               {title}
               </Link></b>
             </div>
             <div className="blog-date">
               Oct 20
             </div>
           </div>
         )};


export default Post
