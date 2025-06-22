// Get the client
const mysql = require('mysql2');
require("dotenv").config()

// Create the connection to database
const connexion = mysql.createConnection({
  host: process.env["HOST"],
  user: process.env["DB_USER"],
  database: process.env["DB_NAME"],
  password: process.env["PASSWORD"]
});

module.exports = { connexion }
