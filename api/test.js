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

prisma.module.findMany({
    where: { OR: [
        {moduleCode: {startsWith: "DSA3"}},
        {moduleCode: {startsWith: "CS3"}},
        {moduleCode: {startsWith: "ST3"}},
    ]
    }
}
).then((res)=>console.log(res))
.catch(err=>console.log(err))