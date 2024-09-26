const express = require("express")
const { createArticle } = require("../controllers/articleController")

const router = express.Router()

router.post("/create", createArticle)

module.exports = router
