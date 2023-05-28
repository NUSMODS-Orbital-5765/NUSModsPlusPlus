const express = require("express");
const dotenv = require("dotenv");
const prisma = require("./db/prisma");
dotenv.config();

const app = express();

const port = 3001;

app.get('/', async (req,res) => {
  
    const users = await prisma.user.findMany()
    const names = users.map((user) => user.name)
    res.send(`There are ${names.length} which are ${names.join(", ")}`);
})
app.listen(port, () => console.log(`App listen at port ${port}!`));