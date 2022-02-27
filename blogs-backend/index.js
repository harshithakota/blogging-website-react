import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
// const swaggerJsDoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "API",
      description: "Blogs API Information",
      contact: {
        name: "Amazing Developer"
      },
      servers: ["http://localhost:9002"]
    }
  },
  // ['.routes/*.js']
  apis: ["index.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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

const User = new mongoose.model("User", userSchema)

const blogSchema = new mongoose.Schema({
    title: String,
    tag: String,
    description: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    created_at: {type: Date, default: Date.now},
})

const Blog = new mongoose.model("Blog", blogSchema)

//Routes
/**
 * @swagger
 * /login:
 *  post:
 *    description: Use to login a user
 *    parameters:
 *      - name: email
 *        in: body
 *        description: Username to login
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - name: password
 *        in: body
 *        description: Password
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: Successfully logged in
 */

app.post("/login", (req, res)=> {
    const { email, password} = req.body
    User.findOne({ email: email}, (err, user) => {
        if(user){
            if(password === user.password ) {
                res.status(200).send({message: "Login Successfull", user: user})
            } else {
                res.status(200).send({ message: "Password didn't match"})
            }
        } else {
            res.status(200).send({message: "User not registered"})
        }
    })
    res.status(200).send("User logged in");
})

/**
 * @swagger
 * /register:
 *  post:
 *    description: Use to register a user
 *    parameters:
 *      - name: name
 *        in: body
 *        description: Username
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - name: email
 *        in: body
 *        description: email
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - name: password
 *        in: body
 *        description: Password
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: Successfully registered
 */

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

/**
 * @swagger
 * /write:
 *  post:
 *    description: Use to add a blog
 *    parameters:
 *      - name: title
 *        in: body
 *        description: Title of the blog
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - name: tag
 *        in: body
 *        description: tag for the blog
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - name: description
 *        in: body
 *        description: Description of blog
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - name: author
 *        in: body
 *        description: Author of the blog
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: Successfully posted
 */

app.post("/write", (req, res)=> {
  console.log(req.body)
  const { title, tag, description,author} = req.body
  const now = new Date();
  console.log(now);
  // .created_at = now;
  Blog.findOne({description: description}, (err, blog) => {
      if(blog){
          res.send({message: "Blog already posted"})
      } else {
          const blog = new Blog({
              title,
              tag,
              description,
              author
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

//to retrieve all blogs
/**
 * @swagger
 * /bloglist:
 *  get:
 *    description: Use to request all blogs
 *    responses:
 *      '200':
 *        description: A successful response
 */

app.get("/bloglist",(req,res) => {
  Blog
  .find()
  .populate({path: 'author', model: 'User'})
  .exec(function(err, blogs) {
    if (err) {
      return res.send(err);
    }
    res.json(blogs);
  });
})

/**
 * @swagger
 * /blogdetail/{id}:
 *  get:
 *    description: Use to request a particular blog
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id of the blog
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get("/blogdetail/:id",(req,res) => {

  Blog
  .find({'_id':req.params.id})
  .populate({path: 'author', model: 'User'})
  .then((err,data)=>{
    if (err) {
      return res.send(err);
    }
    res.send(data)

  });

})

/**
 * @swagger
 * /searchtag/{tag}:
 *  get:
 *    description: Use to request all blogs based on a tag
 *    parameters:
 *      - name: tag
 *        in: path
 *        description: tag of the blog
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get("/searchtag/:tag",(req,res) => {
  // const tag = req.body.tag
  // console.log(tag)
  Blog
  .find({'tag':req.params.tag})
  .populate({path: 'author', model: 'User'})
  .then((err,data)=>{

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
