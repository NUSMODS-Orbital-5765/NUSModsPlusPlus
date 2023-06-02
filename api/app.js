const express = require("express");
const dotenv = require("dotenv");
const prisma = require("./db/prisma");
const bcrypt = require("bcrypt");
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const jwt = require("jsonwebtoken");
const auth = require("./auth");
const cors = require("cors");

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
        studentID: request.body.studentID,
        email: request.body.email,
        password: hashedPassword
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
          email: request.body.email,
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
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );
  
           //   return success response
           response.status(200).send({
            message: "Login Successful",
            email: user.email,
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
        message: "Email not found",
        e,
      });
    });
})
// free endpoint
app.get("/free-endpoint", (request, response) => {
    response.json({ message: "You are free to access me anytime" });
  });
  
  // authentication endpoint
app.get("/auth-endpoint", auth , (request, response) => {
    response.json({ message: "You are authorized to access me" });
  });
  
app.listen(port, () => console.log(`App listen at port ${port}!`));