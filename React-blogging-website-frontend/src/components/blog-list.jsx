import React from "react"
import { connect } from "react-redux";
import './blog-list.css';
import { Link } from "react-router-dom";
//import { retrieveBlogs } from "../actions/blog";


class BlogList extends React.Component {
  constructor(props) {
    super(props);

    //this.refreshData = this.refreshData.bind(this);
    //this.setActiveTutorial = this.setActiveTutorial.bind(this);

    this.state = {
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  // componentDidMount() {
  //     this.props.retrieveBlogs();
  // }

  render() {

     const { blogs } = this.props;

     return (
       <div className="list-group">
          {blogs &&
            blogs.map((blog, index) => (
              <div key={index}>
                <div className="author">
                  Written by Claire
                </div>
                <div className="blog-title">
                  <b><Link to={`/blog-details/${blog.id}`}>
                  {blog.title}
                  </Link></b>
                </div>
                <div className="blog-date">
                  Oct 20
                </div>
              </div>
            ))}
        </div>
     );
   }

}

const mapStateToProps = (state) => {
  return {
    blogs: state.blog,
  };
};

//export default connect(mapStateToProps, { retrieveBlogs })(BlogList);
export default connect(mapStateToProps)(BlogList);
