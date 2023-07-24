const express = require("express");
const dotenv = require("dotenv");
const prisma = require("../db/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { request } = require("http");
const { json } = require("body-parser");
const { error } = require("console");
const fs = require("fs")
dotenv.config();

const rawData = fs.readFileSync("AllModuleDetails.json"); 
const modules = (JSON.parse(rawData))

const input = modules.map(({workload, ...rest}) => {
    return {workload: JSON.stringify(workload), ...rest};
  });
// console.log(input)
prisma.module.createMany({
    data: input
    })

.then(any => console.log("Create Successfully"))
.catch(err => console.log(err))
