const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

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

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30h" }
    )

    return res
      .status(200)
      .json({ success: true, message: "Login successful", token })
  } catch (err) {
    console.error("Error logging in user:", err)
    return res.status(500).json({ success: false, message: "Server error" })
  }
}

const getUserData = async (req, res) => {
  try {
    const { userId } = req.params

    const user = await User.findById(userId).select("-password")

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    return res.status(200).json({ success: true, user })
  } catch (err) {
    console.error("Error fetching user data:", err)
    return res.status(500).json({ success: false, message: "Server error" })
  }
}
module.exports = { createUser, loginUser, getUserData }
