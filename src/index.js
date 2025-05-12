require("dotenv").config()
const express = require("express")
const app = express()
const userRouter = require("./routes/users")
const todosRouter = require("./routes/todos")
const authRouter = require("./routes/auth")
const connexion = require("./config/db")
const bodyParser = require("body-parser")

app.use(userRouter)
app.use(todosRouter)
app.use(authRouter)

app.use(bodyParser.json())

app.listen(3000, () => {
    console.log("Server now listening on port 3000.\n")
})

connexion.query("describe todos;",
    (err, results) => {
        console.log(results)
    }
)
