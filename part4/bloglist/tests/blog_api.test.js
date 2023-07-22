const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

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

    const blogsAfter = await Blog.find({})
    expect(blogsAfter.length).toBe(initialBlogs.length + 1)

    const titles = blogsAfter.map(blog => blog.title)
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

describe('DELETE /api/blogs/:id', () => {
  test('existing blogs are deleted normally, backend responds with 204', async () => {
    const firstBlog = await Blog.findOne({ title: 'First Blog' })

    await api
      .delete(`/api/blogs/${firstBlog.id}`)
      .expect(204)

    const blogsAfter = await Blog.find({})
    expect(blogsAfter.length).toBe(initialBlogs.length - 1)
    expect(blogsAfter).not.toContain(firstBlog)
  })
})

describe('PUT /api/blogs/:id', () => {
  test('updating a blog works as intended', async () => {
    const { title, author, url, likes, id } = await Blog.findOne({ title: 'First Blog' })
    const updatedBlogBody = {
      title, 
      author, 
      url,
      likes: likes + 1
    }

    const response = await api
      .put(`/api/blogs/${id}`)
      .send(updatedBlogBody)

    expect(response.statusCode).toBe(200)
    expect(response.body.likes).toBe(likes + 1)
  })
})

describe('Users:', () => {
  const initialUsers = [
    { username: 'testUser1', password: 'test_password1' },
    { username: 'testUser2', password: 'testPassword2' }
  ]

  beforeEach(async () => {
    await User.deleteMany({})
    
    for (const user of initialUsers) {
      const { username, password } = user
      const passwordHash = await bcrypt.hash(password, 10)

      await User.create({ username, passwordHash})
    }
  })

  describe('GET /api/users', () => {
    test('users are returned correctly as json', async () => {
      await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const users = await User.find({})
      expect(users.length).toBe(initialUsers.length)

      const usernames = users.map(user => user.username)
      expect(usernames).toContain(initialUsers[0].username)
    })
    
    test('the correct number of users is returned', async () => {
      const response = await api.get('/api/users')
      expect(response.body.length).toBe(initialUsers.length)
    })
  })

  describe('POST /api/users', () => {
    test('a valid user is added to the database', async () => {
      const newUser = { 
        username: 'testUser3', 
        name: 'Test User Three',
        password: 'testPassWord3' 
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const usersAfter = await User.find({})
      expect(usersAfter.length).toBe(initialUsers.length + 1)
  
      const usernames = usersAfter.map(user => user.username)
      expect(usernames).toContain('testUser3')
    })

    test('if a user exists, backend responds with proper status code and error message', async () => {
      const result = await api
        .post('/api/users')
        .send(initialUsers[0])
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('expected `username` to be unique')

      const usersAfter = await User.find({})
      expect(usersAfter.length).toBe(initialUsers.length)
    })

    test('users with invalid info are not created', async () => {
      const invalidUsers = [
        { username: 'lo', password: 'nameTooShort'},
        { username: 'passwordTooShort', password: "42"}
      ]

      for (const user of invalidUsers) {
        await api
          .post('/api/users')
          .send(user)
          .expect(400)
          .expect('Content-Type', /application\/json/)
      }

      const usersAfter = await User.find({})
      expect(usersAfter.length).toBe(initialUsers.length)
    })
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})