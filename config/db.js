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

//Create the schemes
connexion.query(`CREATE TABLE IF NOT EXISTS user (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);`)
connexion.query(`CREATE TABLE IF NOT EXISTS todo (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    due_time DATETIME NOT NULL,
    status ENUM("todo", "in progress", "done") NOT NULL DEFAULT "todo",
    user_id INT NOT NULL
);`)

module.exports = { connexion }
