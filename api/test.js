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

const timetable = [
    [ 'ES1000', 'ES1103', 'MA1301' ],
    [ 'CS1010S', 'HSI1000', 'MA2002', 'CS1231S', 'MA2001' ],
    [ 'HSS1000', 'CS2040' ],
    [ 'HSA1000', 'CS2030' ],
    [ 'HSH1000', 'ST2131' ],
    [ 'DTK1234', 'MA2104' ],
    [ 'CS2103T', 'MA2108' ],
    [ 'MA2116', 'CS3243' ],
    []
  ]
console.log(rawModuleList)