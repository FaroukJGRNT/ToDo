// Get the client
const mysql = require('mysql2');

// Create the connection to database
const connection = mysql.createConnection({
  host: process.env["HOST"],
  user: process.env["USER"],
  database: process.env["DB_NAME"],
});

module.exports = { connection }
