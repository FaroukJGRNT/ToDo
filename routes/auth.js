const express = require("express")
const router = express.Router()
const db = require("./../config/db")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const jwtAuth = require("../jwtAuth")

router.post("/register/", async (req, res) => {
    // Process the user request
    const newUser = {
        email: req.body.email,
        name: req.body.name,
        firstname: req.body.firstname
    }
    console.log
    // Check if the user is not existing
    db.connexion.query(`SELECT * FROM user WHERE email = "${newUser.email}";`,
        (err, results) => {
            // Handle any error
            if (err) {
                console.log(err)
                res.status(500)
            } else {
                console.log(results)
                // Check if no user with same email exists
                if (results.length != 0) {
                    res.status(400).json({ error: 'Email already exists' })
                }
            }
        }
    )
    // Now, we create the user and add him
    // First, hash the password
    const hashedPwd = await bcrypt.hash(req.body.password, 10)

    db.connexion.query(`INSERT INTO user (email, password, name, firstname) values ("${newUser.email}", "${hashedPwd}", "${newUser.name}", "${newUser.firstname}");`, (err, results) => { 
            if (err) {
                res.status(500)
            } else {
                res.status(201).json({ message: 'User registered successfully' });
            }
        })
})

router.post("/login/", async (req, res) => {
    // Process the user request
    const newUser = {
        email: req.body.email,
        password: req.body.password,
    }
    // Get the user
    db.connexion.query(`SELECT * FROM user WHERE email = "${newUser.email}";`,
        async (err, results) => {
            // Handle any error
            if (err) {
                res.status(500)
            } else {
                // Check the user with this email exists
                if (results.length != 1) {
                    res.status(401).json({ error: 'Invalid credentials' })
                    res.end()
                }
                // Get its hashed password
                let hashedPwd = results[0]["password"]
                // Compare passwords
                if (await bcrypt.compare(newUser.password, hashedPwd)) {
                    // If good, logs him in
                    token = jwt.sign(newUser, process.env["SECRET_KEY"])
                    res.status(200).json({ token })
                    
                } else {
                    res.status(401).json({ error: 'Invalid credentials' })
                }
            }
        }
    )
})

router.get("/user/", jwtAuth, (req, res) => {
    // View all the users
    db.connexion.query("SELECT * FROM user;",
        (err, results) => {
            if (err) {
                console.log(err)
                res.sendStatus(500)
            } else {
                res.status(200).json(results)
            }
        }
    )
})

router.get("/user/todos/", jwtAuth, (req, res) => {
    // View all the users assigned todos
    db.connexion.query("SELECT * FROM todo WHERE user_id != NULL;",
        (err, results) => {
            if (err) {
                console.log(err)
                res.status(500)
            } else {
                res.status(200).json(results)
            }
        }
    )
})

module.exports = router 
