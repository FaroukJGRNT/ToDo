const express = require("express")
const router = express.Router()

router.post("/register/", (req, res) => {
    // Process the user request
    // If good, create the user and add him
    // to the database. Also logs him in
})

router.post("/login/", (req, res) => {
    // Process the user request
    // If good, logs him in
})

router.get("/user/", (req, res) => {
    // View all the users
})

router.get("/user/todos/", (req, res) => {
    // View all the users assigned todos
})

module.exports = { router }
