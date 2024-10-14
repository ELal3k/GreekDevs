const express = require("express")
const {
  createUser,
  loginUser,
  getUserData,
} = require("../controllers/userController")

const router = express.Router()

router.post("/register", createUser)
router.post("/login", loginUser)
router.get("/:userId", getUserData)

module.exports = router
