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
const {formatDistanceToNow, parseISO} = require("date-fns")

console.log(new 
    Date())