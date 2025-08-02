const jwt = require("jsonwebtoken")

function jwtAuth(req, res, next) {
    console.log("middleware fired")

    const authHeader = req.headers["authorization"]

    if (authHeader == undefined) {
        res.status(401).json({ error: 'Unauthorized' })
    }

    const token = authHeader.split(" ")[1]

    if (!token) {
        res.sendStatus(401)
    }
    jwt.verify(token, process.env["SECRET_KEY"], (err, decoded) => {
        if (err)
            res.sendStatus(401)
        else {
            req.user = decoded
            next()
        }
    });
}

module.exports = jwtAuth
