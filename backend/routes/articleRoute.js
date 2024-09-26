const express = require("express")
const {
  createArticle,
  getAllArticles,
  deleteArticle,
} = require("../controllers/articleController")

const router = express.Router()

router.post("/create", createArticle)
router.get("/get", getAllArticles)
router.delete("/delete/:id", deleteArticle)

module.exports = router
