"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("./db/mongoose");
require("dotenv").config();
const helmet = require("helmet");
const cors = require("cors");
const express = require("express");
const authRouter = require("./routes/auth");
const app = express();
const port = process.env.PORT || 3000;
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
(0, mongoose_1.connectToMongoose)();
app.get("/", (req, res) => res.send("Hello World!"));
app.use("/auth", authRouter);
app.listen(port, () => console.log(`Server listening on port ${port}!`));
