import React from 'react';
import './blog-detail.css';
import CommentBox from "./comments/comment-box.jsx"
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { findBlogsById } from "../actions/blog";

function BlogDetail(props) {
const params = useParams();
console.log(params.id);

const blog = props.blogs.filter( blog => blog.id == params.id );
console.log(blog[0]);
    return (
        <div>
          <div className="cell">
            <article className="article">
              <h1 className="article-title">{blog[0].title}</h1>
              <div className="article-body">
                <p>
                  {blog[0].description}
                </p>
              </div>
            </article>
          </div>

          <CommentBox apiUrl="blog/comments.json" />
        </div>
    )

}

const mapStateToProps = (state) => {
  return {
    blogs: state.blog,
  };
};

export default connect(mapStateToProps, { findBlogsById })(BlogDetail);
