const express = require("express")
const router = express.Router()
const db = require("./../config/db")
const jwtAuth = require("../jwtAuth")

router.get("/:email/", jwtAuth, (req, res, next) => {
    // Same as id
    db.connexion.query(
        `SELECT * FROM user WHERE email = "${req.params.email}";`,
        (err, results) => {
            if (err) {
                console.log(err)
                res.status(400)
            } else {
                if (results.length == 0) {
                    next()
                }
                else
                    res.status(200).json(results[0])
            }
        }
    )
})

router.get("/:id/", jwtAuth, (req, res) => {
    // View user infos
    db.connexion.query(
        `SELECT * FROM user WHERE id = "${req.params.id}";`,
        (err, results) => {
            if (err) {
                console.log(err)
                res.status(400)
            } else {
                res.status(200).json(results[0])
            }
        }
    )
})

router.put("/:id/", jwtAuth, (req, res) => {
    // Modify user infos
    db.connexion.query(
        `UPDATE user
        SET email = "${req.body.email}",
            password = "${req.body.password}",
            name = "${req.body.name}",
            firstname = "${req.body.firstname}"
        WHERE id = "${req.params.id}"
        ;`,
        (err, results) => {
            if (err) {
                console.log(err)
                res.sendStatus(400)
            } else {
                res.status(200).json({message : "Updated user " + req.params.id})
            }
        }
    )
})

// FIXME : Code keeps going down even after an error
router.delete("/:id/", jwtAuth, (req, res, next) => {
    // Check if user exists
    db.connexion.query(
        `SELECT * FROM user WHERE id = "${req.params.id}";`,
        (err, results) => {
            if (err) {
                console.log(err)
                res.status(400).json({message: err.message})
                res.end()
            } else {
                if (results.length == 0) {
                    res.status(400).json({message: "User not found"})
                    res.end()
                }
            }
        }
    )
    // Delete user infos
    db.connexion.query(
        `DELETE FROM user WHERE id = "${req.params.id}";`,
        (err, results) => {
            if (err) {
                console.log(err)
                res.status(400).json({message: err.message})
                res.end()
            } else {
                res.status(200).json({message: "Deleted user " + req.params.id})
            }
        }
    )
})


module.exports = router
