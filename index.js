const express = require("express");
const fs = require("fs");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

var con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

app.post("/users", (req, res) => {
  con.query(
    `INSERT INTO Users (Name, Surname) VALUES('${req.body.fname}','${req.body.lname}')`
  );
  res.write(
    ` <h1> Succesfully added ${req.body.fname} ${req.body.lname} to the database. </h1>
    <script>
     setTimeout(function(){
      window.close();
       }, 3000);
    </script>
    <style>
    @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap");
    *{
      font-family: "Montserrat", sans-serif;
    }
    body{
      text-align: center
    }
    </style>`
  );
});

app.get("/showusers", (req, res) => {
  con.query("SELECT * FROM Users", function (error, results) {
    if (error) {
      throw error;
    } else {
      res.send(results);
    }
  });
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server running`);
});
