const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.post('/', async (req, res, next) => {
  if (!req.body.title || !req.body.url) {
    return res.status(400).json({ error: 'Missing title or url' })
  }

  const newBlog = new Blog(req.body)
  const savedBlog = await newBlog.save()
  res.status(201).json(savedBlog)
})

module.exports = blogsRouter