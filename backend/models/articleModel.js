const mongoose = require("mongoose")

const ArticleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: 200,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: { type: Date, default: Date.now },
})

const Article = mongoose.model("Article", ArticleSchema)

module.exports = Article
