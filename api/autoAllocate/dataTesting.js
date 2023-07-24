const express = require("express");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { error, time } = require("console");
const axios = require("axios");
const fs = require('fs');
const { off } = require("process");
const { stringify } = require("querystring");
dotenv.config();

const rawData = fs.readFileSync("AllModule.json")
const data = JSON.parse(rawData)
const modules = data.map(module => module.moduleCode)

const rawDataDetails = fs.readFileSync("AllModuleDetails.json")
const dataDetails = JSON.parse(rawDataDetails)
console.log(dataDetails.filter(obj => obj.moduleCode === "CS2040"))
const modulesDetails = dataDetails.map(module => module.moduleCode)

const difference = (arr1,arr2) => arr1.filter(x => !arr2.includes(x))
console.log(difference(modules,modulesDetails))