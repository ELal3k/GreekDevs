const express = require("express")
const {
  createArticle,
  getAllArticles,
  deleteArticle,
  updateArticle,
} = require("../controllers/articleController")

const router = express.Router()

router.post("/post", createArticle)
router.get("/get", getAllArticles)
router.delete("/delete/:id", deleteArticle)
router.put("/update/:id", updateArticle)

module.exports = router
