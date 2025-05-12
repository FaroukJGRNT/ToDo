const express = require("express")
const router = express.Router()
const connexion = require("./config/db")

router.get("/:id/", (req, res) => {
    // View user infos
    connexion.query(
        `SELECT * FROM users WHERE id = ${req.query("id")};`,
        (err, results) => {
            if (err) {
                console.log(err)
                res.statusCode(400)
            } else {
                res.statusCode(200).json(results)
            }
        }
    )
// FIXME
}).put((req, res) => {
    // Modify user infos
    connexion.query(
        `CHANGE * FROM users set WHERE id = ${req.query("id")};`,
        (err, results) => {
            if (err) {
                console.log(err)
                res.statusCode(400)
            } else {
                res.statusCode(200).json(results)
            }
        }
    )
}).delete((req, res) => {
    // Delete user infos
    connexion.query(
        `DELETE * FROM users WHERE id = ${req.query("id")};`,
        (err, results) => {
            if (err) {
                console.log(err)
                res.statusCode(400)
            } else {
                res.statusCode(200).json(results)
            }
        }
    )
})

router.get("/:email/", (req, res) => {
    // Same as id
    connexion.query(
        `SELECT * FROM users WHERE email = ${req.query("email")};`,
        (err, results) => {
            if (err) {
                console.log(err)
                res.statusCode(400)
            } else {
                res.statusCode(200).json(results)
            }
        }
    )
})

module.exports = { router }
