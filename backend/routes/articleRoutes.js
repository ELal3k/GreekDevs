const express = require("express")
const {
  createArticle,
  getAllArticles,
  deleteArticle,
  updateArticle,
  getArticleById,
  getArticlesByAuthor,
} = require("../controllers/articleController")

const verifyToken = require("../middleware/auth")

const router = express.Router()

router.get("/get", getAllArticles)
router.get("/get/:id", getArticleById)
router.get("/author/:authorId", getArticlesByAuthor)

router.post("/post", verifyToken, createArticle)
router.delete("/delete/:id", verifyToken, deleteArticle)
router.put("/update/:id", verifyToken, updateArticle)

module.exports = router
