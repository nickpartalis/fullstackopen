const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs =   [{
  title: 'First Blog',
  author: 'Author Name',
  url: 'https://www.blogsandstuff.com/1',
  likes: 3
},
{
  title: 'Second Blog',
  author: 'Author Name',
  url: 'https://www.blogsandstuff.com/2',
  likes: 5
},
{
  title: 'Third Blog',
  author: 'Author Name',
  url: 'https://www.blogsandstuff.com/3',
  likes: 2
}]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.create(initialBlogs)
})

describe('GET /api/blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('the correct number of blogs is returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(initialBlogs.length)
  })
  
  test('blogs have an id property and no _id property', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
    expect(response.body[0]._id).not.toBeDefined()
  })
})

describe('POST /api/blogs', () => {
  test('a valid blog is added to the database', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'Blogger Name',
      url: 'https://www.blogsandstuff.com/4',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(initialBlogs.length + 1)

    const titles = response.body.map(r => r.title)
    expect(titles).toContain('New Blog')
  })

  test('if the likes property is missing, it defaults to zero', async () => {
    const zeroLikesBlog = {
      title: 'Nobody Likes Me',
      author: 'Blogger Name',
      url: 'https://www.blogsandstuff.com/5'
    }

    const response = await api.post('/api/blogs').send(zeroLikesBlog)
    expect(response.body.likes).toBe(0)
  })

  test('if the blog has no title or no url, backend responds with 400', async () => {
    const noTitleBlog = {
      author: 'Dummy Blogger',
      url: 'https://www.totallylegiturl.com'
    }
    await api
      .post('/api/blogs')
      .send(noTitleBlog)
      .expect(400)

    const noUrlBlog = {
      title: 'No URL required',
      author: 'Dummy Blogger'
    }
    await api
      .post('/api/blogs')
      .send(noUrlBlog)
      .expect(400)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})