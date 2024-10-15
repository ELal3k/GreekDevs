const Article = require("../models/articleModel")

const truncateContent = (content, maxLength = 100) => {
  if (content.length <= maxLength) return content
  return content.substr(0, maxLength).trim() + "..."
}

const createArticle = async (req, res) => {
  try {
    const { title, content } = req.body

    if (!req.user || !req.user.userId) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication required" })
    }

    const author = req.user.userId

    if (!title || !content) {
      return res
        .status(400)
        .json({ success: false, message: "Title and content are required" })
    }

    const newArticle = await Article.create({
      title,
      content,
      author,
    })

    await newArticle.populate("author", "-password")

    res.status(201).json({
      success: true,
      message: "Article created successfully",
      article: newArticle,
    })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().populate("author", "username")

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
    const article = await Article.findById(req.params.id).populate(
      "author",
      "username"
    )

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
    const { id } = req.params
    const article = await Article.findById(id)

    if (!article) {
      return req.status(404).json({ message: "Article not found" })
    }
    /* Use with the authentication
    if (article.author.toString() !== req.params.id) {
      return res
        .status(403)
        .json({ message: "You can only delete your own articles" })
    }
    */
    await Article.findByIdAndDelete(id)

    res.status(200).json({ message: "Article deleted successfully" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const updateArticle = async (req, res) => {
  try {
    const { title, content } = req.body

    const article = await Article.findById(req.params.id)

    if (!article) {
      return req.status(404).json({ message: "Article not found" })
    }

    if (article.author.toString() !== req.params.id) {
      return res
        .status(403)
        .json({ message: "You can only delete your own articles" })
    }

    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        updatedAt: Date.now,
      },
      {
        new: true,
        runValidators: true,
      }
    ).populate("author", "username")

    res.status(200).json(updatedArticle)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const getArticlesByAuthor = async (req, res) => {
  try {
    const { authorId } = req.params

    const articles = await Article.find({ author: authorId }).populate(
      "author",
      "username"
    )

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
