const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")

const app = express()
const port = process.env.PORT || 5000

connectDB()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("API is running")
})

app.listen(port, () => console.log(`Server is listening to port ${port}`))
