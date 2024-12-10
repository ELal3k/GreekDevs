const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    avatar: {
      url: {
        type: String,
      },
      publicId: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model("User", UserSchema)

module.exports = User
