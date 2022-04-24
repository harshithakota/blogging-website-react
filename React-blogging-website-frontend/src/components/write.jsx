import React, { useState } from "react"
import './write.css';
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Write = () => {
  const user = JSON.parse(localStorage.getItem("MyUser"))

  const history = useNavigate()

  const [ blog, setBlog] = useState({
      title: "",
      tag:"",
      description:"",
      author: user?._id
  })

  const handleChange = e => {
      const { name, value } = e.target
      console.log(e.target)
      setBlog({
          ...blog,
          [name]: value
      })
  }

  const blogging = () => {
      const { title, tag, description,author } = blog
      console.log(author)
      if( title && tag && description && author){
          axios.post("http://localhost:9002/write", blog)
          .then( res => {
              // alert(res.data.message)
              history("/")
          })
      } else {
          alert("invlid input")
      }

  }

return (
<div className="submit-form">

    <div style={{paddingLeft:'400px',paddingTop:'70px'}}>
    <div className="form-group">
    <label className="labels" htmlFor="title">Title</label>
      <input
          style={{width:'500px'}}
          type="text"
          id="title"
          className="form-control"
          name="title"
          value={blog.title}
          onChange={ handleChange }
          required
        />
        </div>

        <div className="form-group">
        <label className="labels" htmlFor="tag">Tag for the blog</label>
          <input
              style={{width:'500px'}}
              type="text"
              id="tag"
              className="form-control"
              name="tag"
              value={blog.tag}
              onChange={ handleChange }
              required
            />
            </div>

        <div className="form-group">
          <label className="labels" htmlFor="description">Description</label>
        <textarea rows="7"
          type="textarea"
          style={{width:'500px',height:'300px'}}
          className="form-control"
          id="description"
          name="description"
          value={blog.description}
          onChange={ handleChange }
          required
        />
        </div>

          <div className="form-group">
        <input type="hidden" id="author" name="author" value={user.name} onLoad={ handleChange }/>
        </div>

        <div className="blog" style={{paddingBottom:'50px'}}>
        <div className="button" onClick={blogging} >Submit</div>
        </div>
      </div>

</div>
)
}


export default Write

























// import { createBlog } from "../actions/blog";
// import { connect } from "react-redux";
//
//
// class Write extends React.Component {
//   constructor(props) {
//     super(props);
//     this.onChangeTitle = this.onChangeTitle.bind(this);
//     this.onChangeDescription = this.onChangeDescription.bind(this);
//     this.saveBlog = this.saveBlog.bind(this);
//     this.newBlog = this.newBlog.bind(this);
//
//     this.state = {
//       id: null,
//       title: "",
//       description: "",
//
//       submitted: false,
//     };
//   }
//
//   onChangeTitle(e) {
//      this.setState({
//        title: e.target.value,
//      });
//    }
//
//    onChangeDescription(e) {
//      this.setState({
//        description: e.target.value,
//      });
//    }
//
//    saveBlog() {
//      const { title, description } = this.state;
//
//      this.props
//        .createBlog(title, description)
//        .then((data) => {
//          this.setState({
//            id: data.id,
//            title: data.title,
//            description: data.description,
//
//            submitted: true,
//          });
//          console.log(data);
//        })
//        .catch((e) => {
//          console.log(e);
//        });
//    }
//
//    newBlog() {
//      this.setState({
//        id: null,
//        title: "",
//        description: "",
//
//        submitted: false,
//      });
//    }
//
//   render() {
//     return (
//     <div className="submit-form">
//     {this.state.submitted ? (
//         <div>
//           <h4>You submitted successfully!</h4>
//           <button className="btn btn-success" onClick={this.newBlog}>
//             Add
//           </button>
//         </div>
//
//       ) : (
//         <div style={{paddingLeft:'400px',paddingTop:'70px'}}>
//         <div className="form-group">
//         <label className="labels" htmlFor="title">Title</label>
//           <input
//               style={{width:'500px'}}
//               type="text"
//               id="title"
//               className="form-control"
//               required
//               value={this.state.title}
//               onChange={this.onChangeTitle}
//               name="title"
//             />
//             </div>
//
//             <div className="form-group">
//               <label className="labels" htmlFor="description">Description</label>
//             <textarea rows="7"
//               type="textarea"
//               style={{width:'500px',height:'300px'}}
//               className="form-control"
//               id="description"
//               required
//               value={this.state.description}
//               onChange={this.onChangeDescription}
//               name="description"
//             />
//             </div>
//             <div style={{paddingBottom:'50px'}}>
//             <button style={{backgroundColor:'#45686D'}} className="btn btn-success" onClick={this.saveBlog}>
//                 Submit
//             </button>
//             </div>
//           </div>
//       )}
//     </div>
//     )
//   }
// }
//
// const mapStateToProps = (state) => {
// console.log(state);
//   return {
//     blogs: state.blog,
//   };
// };
//
// export default connect(mapStateToProps, { createBlog })(Write);
