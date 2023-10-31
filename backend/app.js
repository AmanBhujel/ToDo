const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();
const path = require("path");
const dotenv = require('dotenv')
dotenv.config();

const PORT = process.env.PORT || 5000;

require("./schemas/todoSchema")
app.use(express.json())
app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );
  next();
});
app.use(require("./Routes/TodoRoutes"))

mongoose.connect(process.env.MONGO_URL)
mongoose.connection.on("connected", (req, res) => {
  console.log("Successfully connected to mongo")
})
mongoose.connection.on("error", (req, res) => {
  console.log("Not connected to mongo")
})

//serving the front end
app.use(express.static(path.join(__dirname, "../front/build")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../front/build/index.html")
    , function (err) {
      res.status(500).send(err)
    }
  )
})
app.listen(PORT, (req, res) => {
  console.log("Server is running in ", PORT)
})