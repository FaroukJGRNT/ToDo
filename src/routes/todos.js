const express = require("express")
const router = express.Router()
const db = require("./../config/db")
const jwtAuth = require("../jwtAuth")

router.get("/", jwtAuth, (req, res) => {
    // Shoot all todo
    db.connexion.query(
        `SELECT * FROM todo;`,
        (err, results) => {
            if (err) {
                console.log(err)
                res.status(400).json({message: err.message})
            } else {
                res.status(200).json(results)
            }
        }
    )
})

router.post("/", jwtAuth, (req, res) => {
    // Make sure the id provided exists
    db.connexion.query(
        `SELECT * FROM user WHERE id = ${req.body.user_id};`,
        (err, results) => {
            if (err) {
                res.status(500).json({message: err.message})
                return
            }
            if (results.length != 1) {
                res.status(400).json({message: "No user with this id."})
                return
            } else {
                // Create a todo
                db.connexion.query(
                    `INSERT INTO todo (title, description, due_time, user_id)
                    values ("${req.body.title}",
                        "${req.body.description}",
                        "${req.body.due_time}",
                        ${req.body.user_id}
                    );`,
                    (err, results) => {
                        if (err) {
                            console.log(err)
                            res.status(400).json({message: err.message})
                        } else {
                            res.status(201).json({message: "Todo successfully created."})
                        }
                    }
                )
            }
        }
    )
})

router.get("/:id/", jwtAuth, (req, res) => {
    // Shoot the id todo
    db.connexion.query(
        `SELECT * FROM todo WHERE id = ${req.params.id};`,
        (err, results) => {
            if (err) {
                console.log(err)
                res.status(400).json({message: err.message})
            } else {
                res.status(200).json(results[0])
            }
        }
    )
})

router.put("/:id/", jwtAuth, (req, res) => {
    // Make sure the id provided exists
    db.connexion.query(
        `SELECT * FROM todo WHERE id = ${req.params.id};`,
        (err, results) => {
            if (err) {
                res.status(500).json({message: err.message})
                return
            }
            if (results.length != 1) {
                res.status(400).json({message: "No user with this id."})
                return
            } else {
                // Modifies the id todo
                db.connexion.query(
                    `UPDATE todo
                    SET title = "${req.body.title}",
                    description = "${req.body.description}",
                    due_time = "${req.body.due_time}", 
                    status = "${req.body.status}", 
                    user_id = ${req.body.user_id}
                    WHERE id = ${req.params.id};`,
                    (err, results) => {
                        if (err) {
                            console.log(err)
                            res.status(400).json({message: err.message})
                        } else {
                            res.status(200).json({message: "Successfully updated"})
                        }
                    }
                )
            }
        }
    )
})

router.delete("/:id/", jwtAuth, (req, res) => {
    // Check if todo exists
    db.connexion.query(
        `SELECT * FROM todo WHERE id = ${req.params.id};`,
        (err, results) => {
            if (err) {
                console.log(err)
                res.status(400).json({message: err.message})
            } else {
                if (results.length != 1)
                    res.status(400).json({message: "No todo with this id"})
                else {
                    // Deletes the id todo
                    db.connexion.query(
                        `DELETE FROM todo WHERE id = ${req.params.id};`,
                        (err, results) => {
                            if (err) {
                                console.log(err)
                                res.status(400).json({message: err.message})
                            } else {
                                res.status(200).json({message: "Todo successfully deleted."})
                            }
                        }
                    )
                }
            }
        }
    )
})

module.exports = router
