import { Request, Response, NextFunction } from "express"
import { transporter } from "../utils/emails"
const userModel = require("../models/user")
const bcrypt = require("bcryptjs")
const validator = require("validator")

exports.registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const hash = bcrypt.hashSync(res.locals.user.password, 12)

  const newUser = new userModel({
    fullName: res.locals.user.fullName,
    email: res.locals.user.email,
    password: hash,
  })

  try {
    const userExists = await userModel
      .find({ email: res.locals.user.email })
      .exec()
    if (userExists[0]) throw new Error("User with this email already exists")

    await newUser.save()
    res.send(`User ${res.locals.user.email} created`)
  } catch (err) {
    next(err)
  }
}

exports.signInUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await userModel
      .find({ email: res.locals.user.email })
      .exec()
    if (!response[0]) throw new Error("email or password incorrect")

    const isPasswordMatching = bcrypt.compareSync(
      res.locals.user.password,
      response[0].password
    )

    if (isPasswordMatching) res.send(response[0])
    else throw new Error("email or password incorrect")
  } catch (err: any) {
    next(err)
  }
}

exports.recoverPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!validator.isEmail(req.body.email)) throw new Error("Invalid email")

  // Define email options
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: req.body.email,
    subject: "Test Email",
    text: "This is a test email sent from Node.js using Nodemailer ",
  }

  // Send the email
  transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) {
      next(error)
    } else {
      console.log("Email sent:", info.response)
      res.send("Email sent successfully")
    }
  })
}

exports.resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, newPassword } = req.body

  const hash = bcrypt.hashSync(newPassword, 12)

  try {
    await userModel.findOneAndUpdate({ email }, { password: newPassword })
  } catch (err) {
    next(err)
  }
}
