const { ObjectId } = require('mongodb')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1, id: 1 })
  res.json(blogs)
})

blogsRouter.post('/', userExtractor, async (req, res) => {
  const user = req.user
  if (!req.body.title || !req.body.url) {
    return res.status(400).json({ error: 'missing title or url' })
  }

  const newBlog = new Blog({ ...req.body, user: user._id })
  const savedBlog = await newBlog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
  const user = req.user
  const blogToDelete = await Blog.findById(req.params.id)

  if (blogToDelete) {
    if (user.id.toString() !== blogToDelete.user.toString()) {
      return res.status(401).json({ error: 'unauthorized' })
    }
    await blogToDelete.deleteOne()
  
    user.blogs = user.blogs.filter(blog => blog._id.toString() !== req.params.id)
    await user.save()
  }

  res.status(204).end()
})

blogsRouter.put('/:id', userExtractor, async (req, res) => {
  // const user = req.user
  const blogToUpdate = await Blog.findById(req.params.id)

  if (!blogToUpdate) {
    return res.status(404).json({error: 'blog does not exist'})
  }
  // if (user.id.toString() !== blogToUpdate.user.toString()) {
  //   return res.status(401).json({ error: 'unauthorized' })
  // }
  const newBlog = {
    ...req.body,
    user: new ObjectId(req.body.user.id)
  }
  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    newBlog,
    { new: true, runValidators: true, context: 'query' },
  )
  res.json(updatedBlog)
})

module.exports = blogsRouter