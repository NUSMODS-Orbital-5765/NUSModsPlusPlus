const express = require("express");
const dotenv = require("dotenv");
const prisma = require("./db/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("./auth");
const cors = require("cors");
const { request } = require("http");
const { json } = require("body-parser");
const { error } = require("console");
dotenv.config();

const app = express();

const jsonParser = express.json();

const port = process.env.PORT || 3001;
function exclude(user, keys) {
      return Object.fromEntries(
        Object.entries(user).filter(([key]) => !keys.includes(key))
      );
    }
app.use(cors());
app.get("/", jsonParser, async (req, res) => {
  const users = await prisma.user.findMany();
  const names = users.map((user) => user.name);
  res.send(`There are ${names.length} which are ${names.join(", ")}`);
});
// register user endpoint
app.post("/register/user",jsonParser, (request, response) => {
  console.log("Receive POST User registration");
  // hash the password
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      console.log("Create User Object");
      const user = {
        name: request.body.name,
        role: "STUDENT",
        NUSId: request.body.NUSId,
        username: request.body.username,
        password: hashedPassword,
        email: request.body.email,
        faculty: request.body.faculty,
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
          console.log(error);
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
app.post("/register/admin",jsonParser, (request, response) => {
  console.log("Receive POST Admin registration");
  // hash the password
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      console.log("Create Admin Object");
      const admin = {
        name: request.body.name,
        staffId: request.body.staffId,
        username: request.body.username,
        password: hashedPassword,
        email: request.body.email,
        faculty: request.body.faculty,
        position: request.body.position,
      };
      if (request.body.code !== process.env.SECRET_CODE) {
        response.status(201).send({
        message: "Wrong Secret Code"
      });
      return;}

      // save the new user
      prisma.admin
        .create({ data: admin })
        // return success if the new user is added to the database successfully
        .then((result) => {
          console.log("Created Admin Successfully");
          response.status(201).send({
            message: "Admin Created Successfully",
            result,
          });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
          console.log(error);
          response.status(500).send({
            message: "Error creating Admin Account",
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
app.post("/login", jsonParser, (request, response) => {
  console.log(`User ${request.body.status} with username = ${request.body.username} Logging in`)

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
              username: user.username,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          //   return success response
          response.status(200).send({
            message: "Login User Successful at "+user.username,
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
  console.log("Create Post Object");
  prisma.post
        .create({ data: post })
        // return success if the new post is added to the database successfully
        .then((result) => {
          console.log("Created Post Successfully");
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

// accept 3 attribute from the 
app.post("/post/search", jsonParser, (request, response) => {
  console.log("POST search REQUEST with filter = " + request.body.filterValue + " and sort value = " + request.body.sortValue);
  console.log(request.body);
  
  //Deal with sortValue
  let orderBy = {};
  if (request.body.sortValue === "timestamp") {orderBy={dateCreated:"desc"}}
  else if (request.body.sortValue === "likes") {orderBy={likes:"desc"}}
  else {orderBy={dateCreated:"desc"}}

  //Deal with filterValue
  let where = {};
  if (request.body.filterValue === "study guide") {where={category:"Study Guide"}}
  else if (request.body.filterValue === "module review") {where={category:"Module Review"}}
  else if (request.body.filterValue === "notes") {where={category:"Notes"}}

  if (request.body.username) {
    where={author: {username: request.body.username}}
  }
  prisma.post.findMany({
  //   skip: 0,
  //   take: 8,
    where,
    orderBy,
    include: {
      author: true,
    }
  })
  .then(postList => {
    console.log("Getting Post Search: ");
    console.log(postList);
    response.status(200).send({
      message: "Post Get Successfully, Page 1",
      postList,
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

app.post("/post/top",jsonParser, (request, response) => {
  console.log("POST top REQUEST");
  const now = new Date();
  const lowerDateLimit = new Date(now.getTime()-request.body.timePeriod);
  console.log(lowerDateLimit);
  prisma.post.findMany({
    where: {
      dateCreated: {
        gte: lowerDateLimit,
      }
    },
    orderBy: {
      dateCreated: "desc",
    },
    include: {
      author: true,
    }
  })
  .then(topPostList => {
    console.log("Getting Post Top: ")
    console.log(topPostList);
    response.status(200).send({
      message: "Post TOP Get Successfully",
      topPostList,
    });
  })
  .catch(error => {
    console.log(error);
    response.status(500).send({
      message: "Error Getting Post Top",
      error,
    });
  })
})




app.get('/profile/get', jsonParser, (request, response) => {
  console.log(request.query);
  prisma.user.findUnique({
    where: {username: (request.query.username),}
  })
  .then(user => {
    console.log("Getting User Profile");
    response.status(200).send({
      message: "User Get Successfully at id ="+request.query.userId,
      user,
    });
  })
  .catch(error => {
    console.log(error);
    response.status(500).send({
      message: "Error Getting User",
      error,
    });
  })
})
// token = 
app.post('/profile/update', [jsonParser,auth], (request, response) => {
  
  prisma.user.update({
    where: {
      username: response.locals.user.username,
    },
    data: {
      name: request.body.name,
      studentId: request.body.studentId,
      faculty: request.body.faculty,
      primaryMajor: request.body.primaryMajor,
      secondaryMajor: request.body.secondaryMajor,
      minors: request.body.minors,
      programme: request.body.programme,
      interests: request.body.interests,
    }
  })
  .then(res => {
    console.log("Updating User Profile");
    response.status(200).send({
      message: "User Update Successfully at id = "+ res.id,
      res,
    });
  })
  .catch(error => {
    console.log(error);
    response.status(500).send({
      message: "Error Getting User",
      error,
    });
  })
})

app.post('/event/add', [jsonParser,auth], (request, response) => {

  console.log("Post event add request")
  prisma.event.create({
    data: {
      name: request.body.name,
      date: request.body.date,
      time: request.body.time,
      category: request.body.category,
      priority: request.body.priority,
      user: {connect: {username: response.locals.user.username}},
    }
  })
  .then(res => {
    console.log("Added Event Successfully");
    response.status(200).send({
      message: `Add Event ${res.id} successfully at username = ${response.locals.user.username}`,
      res,
    });
  })
  .catch(error => {
    console.log(error);
    response.status(500).send({
      message: "Error Adding Event",
      error,
    });
  })
})

app.post('/event/delete', [jsonParser,auth], (request, response) => {

  console.log("POST event delete request")
  prisma.event.delete({
    where: {id: request.body.eventId}
  })
  .then(res => {
    console.log("Delete Event Successfully");
    response.status(200).send({
      message: `Delete Event successfully at username = ${response.locals.user.username}`,
      res,
    });
  })
  .catch(error => {
    console.log(error);
    response.status(500).send({
      message: "Error Deleting Event",
      error,
    });
  })
})
app.get("/event/get", [jsonParser,auth], (request, response) => {
  console.log("Getting Events List");
  prisma.user.findUnique({
    where: {username: response.locals.user.username}}).Event()
  .then(events => {
    console.log("Get Events List Successfully");
    
    response.status(200).send({
      message: "Events List Get Successfully at user id = " + request.query.userId,
      events,
    });
  })
  .catch(error => {
    console.log(error);
    response.status(500).send({
      message: "Error Getting Event",
      error,
    });
  })
})
app.post ("/post/like", [jsonParser,auth], (request, response) => {
  console.log("Like Request on Post "+ request.body.postId + " from User = " + request.body.username)
  const likedUser = request.body.username
  prisma.post.findUnique({
    where: {id: request.body.postId},
  })
  .then(result => {
    if (result) {
      let likedList = result.like;
      if (likedList.includes(likedUser)) {
        //Unlike
        const filteredLikedList =  likedList.filter(e => e !== likedUser)
        prisma.post.update({
          where: {id: request.body.postId},
          data: {
            like: filteredLikedList
          }
        })
        .then(result => {
          console.log("Unlike Sucessfully")
          response.status(200).send({
            message: "User " +request.body.username + " Like Successfully from Post " + request.body.postId,
            result,
          });
        })
        .catch(error => {
          console.log(error)
          response.status(500).send({
            message: "Error Unlike Post",
            error,
          });
        });
      }
      else {
        likedList.push(likedUser);
        prisma.post.update({
          where: {id: request.body.postId},
          data: {
            like: likedList
          }
        })
        .then(any => {
          console.log("Like Successfully")
          response.status(200).send({
            message: "User " +request.body.username + " Like Successfully from Post " + request.body.postId,
            result,
          });
        })
        .catch(error => {
          console.log(error);
          response.status(500).send({
            message: "Error Liking Post",
            error,
          });
        });
      }
    }
  })
  .catch(error => console.log(error));

  
  
})
app.post("/post/get-comment", jsonParser, (request, response) => {
  console.log("Getting Comment from Post " + request.body.postId);
  prisma.comment.findMany({
    where: {post: {every: {id: 1}}},
    include: {author: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  })
  .then(commentsList => {
    console.log("Getting Comment List");
  
    response.status(200).send({
      message: "Getting Comment Successfully from Post " + request.body.postId,
      commentsList,
    });
  })
  .catch(error => {
    console.log(error);
    response.status(500).send({
      message: "Error Getting Comment",
      error,
    });
  })
}

)
app.post("/post/add-comment", jsonParser, (request, response) => {
  const comment = {
    dateCreated: request.body.dateCreated,
    content: request.body.content,
    post: {connect: {id: Number(request.body.postId)}},
    author: {connect: {id: Number(request.body.author)}},
  };
  console.log("Create Comment Object");
  prisma.comment
        .create({ data: comment })
        // return success if the new post is added to the database successfully
        .then((commentsList) => {
          console.log(`Created Comment Successfully to post ${request.body.postId} and username ${request.body.author}`);
          response.status(201).send({
            message: "Comment Created Successfully",
            commentsList,
          });
        })
        // catch error if the new post wasn't added successfully to the database
        .catch((error) => {
          console.log(error);
          response.status(500).send({
            message: "Error creating Comment",
            error,
          });
        });
});
app.get("/free-endpoint", (request, response) => {
  response.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
app.get("/auth-endpoint", auth, (request, response) => {
  response.json({ message: "You are authorized to access me" });
});

app.listen(port, () => console.log(`App listen at port ${port}!`));
