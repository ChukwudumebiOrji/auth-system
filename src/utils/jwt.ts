import { SignOptions } from "jsonwebtoken"
const jwt = require("jsonwebtoken")

export const signJWT = (payload: any, key: string, options: SignOptions) => {
  const jwt_token = jwt.encode(payload, key, options)
  return jwt_token
}
