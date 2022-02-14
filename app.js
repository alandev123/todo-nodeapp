const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const DB = process.env.APP_CONNECTION;
const PORT = process.env.PORT;
const app = express();
app.use(bodyParser.json());

const swaggerUI = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Workluge DataBaseAccess Module",
      version: "swagger-ui-express 4.0.0",
    },
    servers: [
      {
        url: process.env.LOCAL_APP_URL,
      },
    ],
  },
  apis: [
    "./routes/*.js",
  ],
};
const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// console.log(PORT,DB)
// routes
app.use("/todo", require("./routes/todoList"));
// end of routes

//connect to db
mongoose.connect(DB, {useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
    console.log("mongodb is connected");
}).catch((error)=>{
    console.log("mondb not connected");
    console.log(error);
});

app.listen(PORT,console.log("App Started on",PORT))

module.exports = app;
