// require('./utils/config')
const express = require('express')
const mongoose = require('mongoose')
require('express-async-errors')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const blogsRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const config = require('./utils/config')
const middleware = require('./utils/middleware')

mongoose.set('strictQuery', false)
mongoose.connect(config.MONGODB_URI)
  .then((res) => {
    logger.info('Connected to MongoDB')
  })
  .catch((err) => {
    logger.error('Error connecting to MongoDB:', err.message)
  })

app.use(express.json())
app.use(cors())
app.use('/api/blogs', blogsRouter)

morgan.token('postBody', (req, res) => {
  if (req.method === 'POST') {
    const { name, number } = req.body
    return JSON.stringify({ name, number })
  }
})
app.use(morgan((tokens, req, res) => [
  tokens.method(req, res),
  tokens.url(req, res),
  tokens.status(req, res),
  tokens.res(req, res, 'content-length'), '-',
  tokens['response-time'](req, res), 'ms',
  tokens.postBody(req, res),
].join(' ')))

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
