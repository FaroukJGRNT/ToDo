const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    // Shoot all todos
    connexion.query(
        `SELECT * FROM todos;`,
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
}).post((req, res) => {
    // Create a todo
    connexion.query(
        `INSERT INTO todos ${res.body.} ${} ${};`,
        (err, results) => {
            if (err) {
                console.log(err)
                res.statusCode(400)
            } else {
                res.statusCode(201).json(results)
            }
        }
    )
})

router.get("/:id/", (req, res) => {
    // Shoot the id todo
    connexion.query(
        `SELECT * FROM todos WHERE id = ${req.query("id")};`,
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
    // Modifies the id todo
    connexion.query(
        `CHANGE * FROM todos WHERE id = ${req.query("id")} ${} ${} ${};`,
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
    // Deletes the id todo
    connexion.query(
        `DELETE * FROM todos WHERE id = ${req.query("id")};`,
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
