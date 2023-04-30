import { Response, Request, NextFunction } from "express"
const validator = require("validator")

const validateUser = (req: Request, res: Response, next: NextFunction) => {
  const { fullName, email, password } = req.body
  const names = fullName.split(" ")

  names.forEach((name: string) => {
    if (!validator.isAlpha(name)) {
      throw new Error("Name is not valid")
    }
  })

  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid")
  }

  res.locals.user = { fullName, email, password }

  next()
}

module.exports = { validateUser }
