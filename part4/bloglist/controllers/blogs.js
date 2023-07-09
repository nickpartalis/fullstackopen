const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res) => {
  Blog
    .find({})
    .then(blogs => {
      res.json(blogs)
    })
})

blogsRouter.post('/', (req, res, next) => {
  const newBlog = new Blog(req.body)

  newBlog.save()
    .then(savedBlog => {
      res.status(201).json(savedBlog)
    })
    .catch(err => next(err))
})

module.exports = blogsRouter