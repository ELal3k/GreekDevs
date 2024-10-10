const { message } = require("prompt")
const Article = require("../models/articleModel")

const truncateContent = (content, maxLength = 100) => {
  if (content.length <= maxLength) return content
  return content.substr(0, maxLength).trim() + "..."
}

const createArticle = async (req, res) => {
  try {
    const { title, content } = req.body
    const author = req.user.id

    const newArticle = await Article.create({
      title,
      content,
      author,
    })

    await newArticle.populate("author", "username")

    res.status(201).json(newArticle)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find()

    const truncatedArticles = articles.map((article) => ({
      ...article.toObject(),
      content: truncateContent(article.content),
    }))
    res.status(200).json(truncatedArticles)
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
    if (!article) {
      return req.status(404).json({ message: "Article not found" })
    }

    res.status(200).json({ message: "Article deleted successfully" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const updateArticle = async (req, res) => {
  try {
    const { title, content, author } = req.body

    const article = await Article.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        author,
        updatedAt: Date.now(),
      },
      { new: true, runValidators: true }
    )

    if (!article) {
      return req.status(404).json({ message: "Article not found" })
    }

    res.status(200).json(article)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const getArticlesByAuthor = async (req, res) => {
  try {
    const { author } = req.params
    const decodedAuthor = decodeURIComponent(author)

    const articles = await Article.find({ author: decodedAuthor })

    if (articles.length === 0) {
      return res
        .status(404)
        .json({ message: "No articles found by this author" })
    }

    const truncatedArticles = articles.map((article) => ({
      ...article.toObject(),
      content: truncateContent(article.content),
    }))

    res.status(200).json(truncatedArticles)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = {
  createArticle,
  getAllArticles,
  deleteArticle,
  updateArticle,
  getArticleById,
  getArticlesByAuthor,
}
