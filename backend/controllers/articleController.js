const Article = require("../models/articleModel")

const createArticle = async (req, res) => {
  try {
    const { title, content } = req.body

    const newArticle = await Article.create({
      title,
      content,
    })

    res.status(201).json(newArticle)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find()
    res.status(200).json(articles)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)

    if (!article) {
      return req.status(404).json({ message: "Article not found" })
    }

    res.status(200).json(article)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id)
    if (!Article) {
      return req.status(404).json({ message: "Article not found" })
    }

    res.status(200).json({ message: "Article deleted successfully" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const updateArticle = async (req, res) => {
  try {
    const { title, content } = req.body

    const article = await Article.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        updatedAt: Date.now(),
      },
      { new: true, runValidators: true }
    )

    console.log(article.title)

    if (!Article) {
      return req.status(404).json({ message: "Article not found" })
    }

    res.status(200).json(article)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

module.exports = {
  createArticle,
  getAllArticles,
  deleteArticle,
  updateArticle,
  getArticleById,
}
