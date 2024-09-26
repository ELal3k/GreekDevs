const express = require("express")
const {
  createArticle,
  getAllArticles,
} = require("../controllers/articleController")

const router = express.Router()

router.post("/create", createArticle)
router.get("/getarticles", getAllArticles)

module.exports = router
