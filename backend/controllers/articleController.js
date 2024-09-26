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

module.exports = { createArticle, getAllArticles }
