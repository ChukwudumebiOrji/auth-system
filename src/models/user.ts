import mongoose, { Schema } from "mongoose"
import { IUser } from "../types/user"

const userSchema: Schema<IUser> = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

const userModel = mongoose.model("user", userSchema)

module.exports = userModel
