const mongoose = require("mongoose")
const uri = process.env.DB_URI

async function connectDB() {
  try {
    await mongoose.connect(uri, {
      autoIndex: true,
    })
    console.log("MongoDB connected successfully")
  } catch (err) {
    console.error("MongoDB connection error:", err)
  }
}

module.exports = connectDB
