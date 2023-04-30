const mongoose = require("mongoose")

export const connectToMongoose = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/users")
    console.log("MongoDB connected")
  } catch (error) {
    console.log("error connecting to MongoDB")
  }
}
