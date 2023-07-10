const { dummy, totalLikes, favoriteBlog } = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = dummy(blogs)
  expect(result).toBe(1)
})

const emptyList = []
const listWithOneBlog = [
  {
    title: 'The Only Blog',
    author: 'Author Name',
    url: 'http://www.blogsandstuff.com/theonlyblog',
    likes: 5,
  }
]
const listWithManyBlogs = [
  {
    title: 'First Blog',
    author: 'Author Name',
    url: 'http://www.blogsandstuff.com/1',
    likes: 3,
  },
  {
    title: 'Second Blog',
    author: 'Author Name',
    url: 'http://www.blogsandstuff.com/2',
    likes: 5,
  },
  {
    title: 'Third Blog',
    author: 'Author Name',
    url: 'http://www.blogsandstuff.com/3',
    likes: 2,
  }
]

describe('total likes', () => {
  test('of an empty list is zero', () => {
    expect(totalLikes(emptyList)).toBe(0)
  })
  test('when the list has only one blog equals the likes of that blog', () => {
    expect(totalLikes(listWithOneBlog)).toBe(5)
  })
  test('of a bigger list is calculated correctly', () => {
    expect(totalLikes(listWithManyBlogs)).toBe(10)
  })
})

describe('favorite blog', () => {
  test('when the list is empty is an empty object', () => {
    expect(favoriteBlog(emptyList)).toEqual({})
  })
  test('when the list has only one blog equals that blog', () => {
    expect(favoriteBlog(listWithOneBlog)).toEqual(listWithOneBlog[0])
  })
  test('of a bigger list is calculated correctly', () => {
    expect(favoriteBlog(listWithManyBlogs)).toEqual(listWithManyBlogs[1])
  })
})