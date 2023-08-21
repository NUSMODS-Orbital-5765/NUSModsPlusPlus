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

function writeToFile (filePath, data) {
    const dataToWrite = JSON.stringify(data);
    fs.writeFileSync(filePath,dataToWrite)
}

async function downloadModuleDetail(modules) {
    const details = [];
    for(const module of modules) {
      await axios.get(`https://api.nusmods.com/v2/2023-2024/modules/${module}.json`)
      .then(result => {
        console.log(`Downloading module ${module}`)
        const moduleData = (result.data);
        const {semesterData, ...modifiedModuleData} = moduleData
        details.push(modifiedModuleData);
        })
      .catch(err => console.log(err))
      await new Promise(resolve => setTimeout(resolve, 500)); // 3 sec
    }
    return details
  };
downloadModuleDetail(modules)
.then(details => writeToFile("AllModuleDetails.json",details))
.catch(err=>console.log(err))
