require("dotenv").config();
const express = require("express");
const cors = require('cors')
const connect = require("./configs/db");
const app = express();
app.use(cors())
app.use(express.json());


const User = require("./models/user.model");
const Post = require("./models/post.model");

app.use(require("./controllers/auth.controller"));
app.use(require("./controllers/post.controller"));
app.use(require("./controllers/user.controller"));

app.listen(process.env.SERVER_PORT, async function () {
  await connect();
  console.log(`Listening on port ${process.env.SERVER_PORT}`);
});
