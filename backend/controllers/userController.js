const { message } = require("prompt")
const User = require("../models/userModel")
const bcrypt = require("bcrypt")

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" })
    }

    const emailExists = await User.findOne({ email })
    if (emailExists) {
      return res.status(400).json({ message: "Email already in use" })
    }

    const usernameExists = await User.findOne({ username })
    if (usernameExists) {
      return res.status(400).json({ message: "Username already in use" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    })

    return res
      .status(201)
      .json({ success: true, message: "User successfully created" })
  } catch (err) {
    console.error("Error creating user:", err)
    return res.status(500).json({ success: false, message: "Server Error" })
  }
}

module.exports = { createUser }
