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

module.exports = { createArticle }
