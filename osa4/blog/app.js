const express = require("express")
const app = express()
const cors = require("cors")
const config = require("./utils/config")
const logger = require("./utils/logger")
const mongoose = require("mongoose")
require("express-async-errors")

const blogRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const middleware = require("./utils/middleware")

logger.info("Connecting to", config.DB_URL)

mongoose
  .connect(config.DB_URL)
  .then(() => {
    logger.info("Connected to MongoDB")
  })
  .catch((err) => {
    logger.error("Error connecting to MongoDB:", err.message)
  })

app.use(cors())
app.use(express.static("build"))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)
app.use("/api/blogs", middleware.userExtractor, blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
