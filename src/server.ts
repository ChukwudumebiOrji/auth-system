import { Request, Response } from "express"
import { connectToMongoose } from "./db/mongoose"

require("dotenv").config()
const helmet = require("helmet")
const cors = require("cors")
const express = require("express")
const authRouter = require("./routes/auth")
const errorHandler = require("./middlewares/error-handler")

const app = express()
const port = process.env.PORT || 3000

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

connectToMongoose()

app.get("/", (req: Request, res: Response) => res.send("Hello World!"))

app.use("/auth", authRouter)

app.use(errorHandler)

app.listen(port, () => console.log(`Server listening on port ${port}!`))
