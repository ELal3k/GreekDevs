const multer = require("multer")
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const cloudinary = require("../config/cloudinaryConfig")

/* If we didn't used the `multe-storage-cloudinary` package we can use the `multer.memoryStorage` method */
//const storage = multer.memoryStorage()

//We use the `multer-storage-cloudinary` package
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "avatars",
    allowedFormats: ["jpg", "png", "jpeg"],
    transformation: [
      { width: 200, height: 200, crop: "fill", gravity: "face" },
    ],
  },
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
}) //limits the size of the file to 5MB

module.exports = upload
