const express = require("express")
const nodemailer = require("nodemailer")

const app = express()

// Set up a transporter
export const transporter = nodemailer.createTransport({
  service: "yahoo",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
})
