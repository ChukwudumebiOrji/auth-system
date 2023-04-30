"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
router.route("/").get((req, res) => res.send("Hello Auth!"));
module.exports = router;
