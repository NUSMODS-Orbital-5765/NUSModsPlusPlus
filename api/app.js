const express = require("express");
const dotenv = require("dotenv");
const prisma = require("./db/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("./auth");
const cors = require("cors");
const formidable = require("express-formidable");
const { request } = require("http");
dotenv.config();

const app = express();

const jsonParser = express.json();

const port = process.env.PORT || 3001;

app.use(cors());
app.get("/", jsonParser, async (req, res) => {
  const users = await prisma.user.findMany();
  const names = users.map((user) => user.name);
  res.send(`There are ${names.length} which are ${names.join(", ")}`);
});
// register endpoint
app.post("/register", (request, response) => {
  console.log("Receive POST registration");
  // hash the password
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      console.log("Create User Object");
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
        interests: request.body.interests,
      };

      // save the new user
      prisma.user
        .create({ data: user })
        // return success if the new user is added to the database successfully
        .then((result) => {
          console.log("Created User");
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
app.post("/login", jsonParser, (request, response) => {
  console.log("User Logging in")
  prisma.user
    .findUnique({
      where: {
        username: request.body.username,
      },
    })
    .then((user) => {
      bcrypt
        .compare(request.body.password, user.password)
        .then((passwordCheck) => {
          // check if password matches
          if (!passwordCheck) {
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
          });
        })
        .catch((error) => {
          response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    .catch((e) => {
      response.status(404).send({
        message: "username not found",
        e,
      });
    });
});

app.post("/post/upload", jsonParser, (request, response) => {
  
  console.log("Create Post Object");
  const post = {
    dateCreated: request.body.dateCreated,
    title: request.body.title,
    category: request.body.category,
    relatedMajor: request.body.relatedMajor,
    content: request.body.content,
    upload_file: request.body.upload_file,
    tags: request.body.tags,
    author: {connect: {id: Number(request.body.author)}},
  };
  prisma.post
        .create({ data: post })
        // return success if the new post is added to the database successfully
        .then((result) => {
          console.log("Created Post");
          response.status(201).send({
            message: "Post Created Successfully",
            result,
          });
        })
        // catch error if the new post wasn't added successfully to the database
        .catch((error) => {
          console.log(error);
          response.status(500).send({
            message: "Error creating Post",
            error,
          });
        });
});
// free endpoint
app.get("/post/all-post", (request, response) => {
  prisma.post.findMany({
    skip: 0,
    take: 8,
    orderBy: {
      dateCreated: "desc",
    }
  })
  .then(result => {
    console.log("Sending Posts");
    response.status(201).send({
      message: "Post Get Successfully, Page 1",
      result,
    });
  })
  .catch(error => {
    console.log(error);
    response.status(500).send({
      message: "Error Getting Post",
      error,
    });
  })

})
app.get("/free-endpoint", (request, response) => {
  response.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
app.get("/auth-endpoint", auth, (request, response) => {
  response.json({ message: "You are authorized to access me" });
});

app.listen(port, () => console.log(`App listen at port ${port}!`));
