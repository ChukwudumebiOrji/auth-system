import { Request, Response, NextFunction } from "express"

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err.message)
  res.send(err.message)
}

module.exports = errorHandler
