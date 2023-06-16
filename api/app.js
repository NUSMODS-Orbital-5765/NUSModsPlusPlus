const express = require("express");
const dotenv = require("dotenv");
const prisma = require("./db/prisma");
const bcrypt = require("bcrypt");
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const jwt = require("jsonwebtoken");
const auth = require("./auth");
const cors = require("cors");
const { request } = require("http");
dotenv.config();


const app = express();
app.use(cors());

const port = process.env.PORT || 3001;

app.get('/', async (req,res) => {
    const users = await prisma.user.findMany();
    const names = users.map((user) => user.name);
    res.send(`There are ${names.length} which are ${names.join(", ")}`);
});
// register endpoint
app.post("/register", jsonParser, (request, response) => {
    console.log("Receive POST registration")
  // hash the password
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      console.log("Create User Object")
      const user = {
        name: request.body.name,
        studentId: request.body.studentId,
        username: request.body.username,
        password: hashedPassword,
        faculty: request.body.studentId,
        primaryMajor: request.body.primaryMajor,
        secondaryMajor: request.body.secondaryMajor,
        minors: request.body.minors,
        programme: request.body.programme,
        interests: request.body.interests
      };

      // save the new user
      prisma.user.create({data:user,})
        // return success if the new user is added to the database successfully
        .then((result) => {
            console.log("Created User")
          response.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});
// {
//     "name": "Yuting",
//     "studentID": "GG2123",
//     "email": "look4us@u.nus.edu",
//     "password": "password"
// }
app.post("/login",jsonParser, (request, response) => {
    prisma.user.findUnique({
        where: {
          username: request.body.username,
        },
      })
    .then((user)=>{
        bcrypt.compare(request.body.password, user.password)
        .then((passwordCheck) => {

            // check if password matches
            if(!passwordCheck) {
              return response.status(400).send({
                message: "Passwords does not match",
                error,
              });
            }
  
          //   create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              userName: user.username,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );
  
           //   return success response
           response.status(200).send({
            message: "Login Successful",
            username: user.username,
            userId: user.id,
            token,
          });})
        .catch((error) => {
            response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          })
     })
    .catch((e) => {
      response.status(404).send({
        message: "username not found",
        e,
      });
    });
})

app.post("/post/upload",jsonParser, (request,response) => {
  console.log("Create Post Object")
      
      const post = {
        dateCreated: new Date(request.body.dateCreated), // it's not in the form, but should record time and date of upload once button is pressed
        title: request.body.title,
        category: request.body.category,
        relatedMajor: request.body.relatedMajor,
        content: request.body.content,
        upload_file: request.body.upload_file, // possible to store the filepreviewURL so can download the file on click?
        tags: request.body.tags,
        author: {connect: {id: parseInt(request.body.author)}}, // this should be a user object, which connects to a profile (will set up later lol)
      };
      console.log(post);
      prisma.post.create({data:post,})
        // return success if the new user is added to the database successfully
        .then((result) => {
            console.log("Post Created")
          response.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
          console.log(error.message)
          response.status(500).send({
            message: "Error creating post",
            error,
          });
        });
});
// free endpoint
app.get("/free-endpoint", (request, response) => {
    response.json({ message: "You are free to access me anytime" });
  });
  
  // authentication endpoint
app.get("/auth-endpoint", auth , (request, response) => {
    response.json({ message: "You are authorized to access me" });
  });
  
app.listen(port, () => console.log(`App listen at port ${port}!`));