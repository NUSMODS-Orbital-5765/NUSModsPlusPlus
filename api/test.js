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
const {formatDistanceToNow, parseISO} = require("date-fns");
const { rawListeners } = require("process");

prisma.modulePlan
        .findMany(
          {
          where: {},
          select: {
            owner: true
          },
          orderBy: {
            id: "asc",
          }
        }
        )
        // return success if the new post is added to the database successfully
        .then((result) => {console.log(result)})