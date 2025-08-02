const express = require("express")
const app = express()
const userRouter = require("./routes/users")
const todosRouter = require("./routes/todos")
const authRouter = require("./routes/auth")
const bodyParser = require("body-parser")
const morgan = require("morgan")("dev")
const cors = require("cors")

app.use(cors())
app.use(bodyParser.json())
app.use(morgan)

app.use("/", authRouter)
app.use("/users/", userRouter)
app.use("/todos/", todosRouter)


app.listen(3000, () => {
    console.log("Server now listening on port 3000.\n")
})
