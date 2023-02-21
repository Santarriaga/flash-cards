require("dotenv").config()
require("express-async-errors")
const express = require("express")
const authenticateUser = require("./middleware/authentication")
const cors = require("cors")
const helemt = require("helmet")
const xss = require("xss-clean")
const rateLimiter = require("express-rate-limit")

const app = express()

//connect database
const connectDB = require("./db/connect")

//routers
const authRouter = require("./routes/auth")
const collectionRouter = require("./routes/collection")
const cardsRouter = require("./routes/cards")

//Error Handling
const notFoundMiddleware = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")

//lets us access json data in the request
app.use(express.json())

//setting up extra security / middleware

app.set("trust proxy", 1)
app.use(
  rateLimiter({
    windoMS: 15 * 60 * 1000, //15 minute
    max: 100, //limit each IP to 100 request per windowMs
  })
)

app.use(helemt())
app.use(cors())
app.use(xss())

//routes
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/collections", authenticateUser, collectionRouter)
app.use("/api/v1/cards", authenticateUser, cardsRouter)

app.get("/", (req, res) => {
  res.send("Flash cards api")
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
