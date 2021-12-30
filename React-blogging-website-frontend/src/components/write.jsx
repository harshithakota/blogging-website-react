import React from "react"
import { connect } from "react-redux";
import './write.css';
import { createBlog } from "../actions/blog";

class Write extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveBlog = this.saveBlog.bind(this);
    this.newBlog = this.newBlog.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "",

      submitted: false,
    };
  }

  onChangeTitle(e) {
     this.setState({
       title: e.target.value,
     });
   }

   onChangeDescription(e) {
     this.setState({
       description: e.target.value,
     });
   }

   saveBlog() {
     const { title, description } = this.state;

     this.props
       .createBlog(title, description)
       .then((data) => {
         this.setState({
           id: data.id,
           title: data.title,
           description: data.description,

           submitted: true,
         });
         console.log(data);
       })
       .catch((e) => {
         console.log(e);
       });
   }

   newBlog() {
     this.setState({
       id: null,
       title: "",
       description: "",

       submitted: false,
     });
   }

  render() {
    return (
    <div className="submit-form">
    {this.state.submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={this.newBlog}>
            Add
          </button>
        </div>

      ) : (
        <div style={{paddingLeft:'400px',paddingTop:'70px'}}>
        <div className="form-group">
        <label className="labels" htmlFor="title">Title</label>
          <input
              style={{width:'500px'}}
              type="text"
              id="title"
              className="form-control"
              required
              value={this.state.title}
              onChange={this.onChangeTitle}
              name="title"
            />
            </div>

            <div className="form-group">
              <label className="labels" htmlFor="description">Description</label>
            <textarea rows="7"
              type="textarea"
              style={{width:'500px',height:'300px'}}
              className="form-control"
              id="description"
              required
              value={this.state.description}
              onChange={this.onChangeDescription}
              name="description"
            />
            </div>
            <div style={{paddingBottom:'50px'}}>
            <button style={{backgroundColor:'#45686D'}} className="btn btn-success" onClick={this.saveBlog}>
                Submit
            </button>
            </div>
          </div>
      )}
    </div>
    )
  }
}

const mapStateToProps = (state) => {
console.log(state);
  return {
    blogs: state.blog,
  };
};

export default connect(mapStateToProps, { createBlog })(Write);
