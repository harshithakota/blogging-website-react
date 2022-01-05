import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/myLoginRegisterDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})



const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const blogSchema = new mongoose.Schema({
    title: String,
    tag: String,
    description: String
})

const User = new mongoose.model("User", userSchema)

const Blog = new mongoose.model("Blog", blogSchema)

//Routes
app.post("/login", (req, res)=> {
    const { email, password} = req.body
    User.findOne({ email: email}, (err, user) => {
        if(user){
            if(password === user.password ) {
                res.send({message: "Login Successfull", user: user})
            } else {
                res.send({ message: "Password didn't match"})
            }
        } else {
            res.send({message: "User not registered"})
        }
    })
})

app.post("/register", (req, res)=> {
    const { name, email, password} = req.body
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registerd"})
        } else {
            const user = new User({
                name,
                email,
                password
            })
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Registered, Please login now." })
                }
            })
        }
    })

})


app.post("/write", (req, res)=> {
  console.log(req.body)
  const { title, tag, description} = req.body
  Blog.findOne({description: description}, (err, blog) => {
      if(blog){
          res.send({message: "Blog already posted"})
      } else {
          const blog = new Blog({
              title,
              tag,
              description
          })
          blog.save(err => {
              if(err) {
                  res.send(err)
              } else {
                  res.send( { message: "Successfully posted!" })
              }
          })
      }
  })

})

app.get("/bloglist",(req,res) => {
  Blog.find(function(err, blogs) {
    if (err) {
      return res.send(err);
    }
    res.json(blogs);
  });
})


app.get("/blogdetail/:id",(req,res) => {

  Blog.find({'_id':req.params.id}).then((err,data)=>{
    if (err) {
      return res.send(err);
    }
    res.send(data)

  });

})

app.get("/searchtag/:tag",(req,res) => {
  // const tag = req.body.tag
  // console.log(tag)
  Blog.find({'tag':req.params.tag}).then((err,data)=>{

    if (err) {
      return res.send(err);
    }
    res.send(data)
    console.log(data)
  });


})

app.listen(9002,() => {
    console.log("BE started at port 9002")
})
