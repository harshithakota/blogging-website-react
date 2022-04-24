import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import moment from 'moment';


//render component for pagination
function Post(props) {
  const { _id,title,author,tag,description,created_at } = props.data;
  return (
    <div className="list-group">
    <div class="card">
  <h5 class="card-header">Written by {author?.name}</h5>
  <div class="card-body">
    <h5 class="card-title">{title}</h5>
    <p class="card-text">{ description.length < 80 ? description : description.substring(0, 80)+".." }</p>
    <div className="blog-date" style={{paddingBottom:'20px'}}>
        {moment(created_at).format('MMMM Do YYYY')}
          </div>
    <Link to={`/blog-details/${_id}`} class="btn btn-primary">Read Article</Link>
  </div>
</div>
</div>
    )};


export default Post
