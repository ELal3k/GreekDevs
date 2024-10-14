const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")

const app = express()
const port = process.env.PORT || 5000

const articleRoutes = require("./routes/articleRoutes")
const userRoutes = require("./routes/userRoutes")

connectDB()

app.use(cors())
app.use(express.json())
app.use("/api/articles", articleRoutes)
app.use("/api/users", userRoutes)

app.get("/", (req, res) => {
  res.send("API is running")
})

app.listen(port, () => console.log(`Server is listening to port ${port}`))
