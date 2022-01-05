import React, { useState, useEffect } from 'react';
import './blog-detail.css';
import CommentBox from "./comments/comment-box.jsx"
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BlogDataService from "../services/BlogService";

function BlogDetail(props) {
const params = useParams();

const dispatch = useDispatch();

const [blogdetail, setBlogData] = useState([]);

useEffect(() => {

  BlogDataService.get(params.id)
      .then(response => {
        setBlogData(response.data[0]);
      })
      .catch(e => {
        console.log(e);
      });

}, []);

    return (
        <div>
          <div className="cell">
            <article className="article">
              <h1 className="article-title">{blogdetail.title}</h1>
              <div className="article-body">
                <p>
                  {blogdetail.description}
                </p>
              </div>
            </article>
          </div>

          <CommentBox apiUrl="blog/comments.json" />
        </div>
    )

}

export default BlogDetail;
