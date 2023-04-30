"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
// Set up a transporter
exports.transporter = nodemailer.createTransport({
    service: "yahoo",
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
    },
});
