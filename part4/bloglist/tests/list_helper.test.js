const { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes } = require('../utils/list_helper')

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
    likes: 4,
  },
  {
    title: 'Second Blog',
    author: 'Blog Creator',
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
    expect(totalLikes(listWithManyBlogs)).toBe(11)
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

describe('mostBlogs', () => {
  test('when the list is empty is an empty object', () => {
    expect(mostBlogs(emptyList)).toEqual({})
  })
  test('when there is only 1 blog is its author with count 1', () => {
    expect(mostBlogs(listWithOneBlog)).toEqual({ author: 'Author Name', blogs: 1})
  })
  test('for more than 1 blog is displayed correctly', () => {
    expect(mostBlogs(listWithManyBlogs)).toEqual({ author: 'Author Name', blogs: 2})
  })
})

describe('mostLikes', () => {
  test('when the list is empty is an empty object', () => {
    expect(mostLikes(emptyList)).toEqual({})
  })
  test('when there is only 1 blog is its author with count 1', () => {
    expect(mostLikes(listWithOneBlog)).toEqual({ author: 'Author Name', likes: 5})
  })
  test('for more than 1 blog is displayed correctly', () => {
    expect(mostLikes(listWithManyBlogs)).toEqual({ author: 'Author Name', likes: 6})
  })
})