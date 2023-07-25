const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0
  if (blogs.length === 1) return blogs[0].likes
  return blogs.reduce((acc, blog) => acc + blog.likes , 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {}
  if (blogs.length === 1) return blogs[0]
  return blogs.reduce((mostLiked, current) => {
    return (current.likes > mostLiked.likes) ? current : mostLiked
  })
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {}

  const authors = lodash.countBy(blogs, 'author')
  const maxAuthor = lodash.maxBy(
    lodash.entries(authors),
    ([ author, count ]) => count
  )

  return { author: maxAuthor[0], blogs: maxAuthor[1]}
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {}

  const authorsAndBlogs = lodash.groupBy(blogs, 'author')
  const authorsTotalLikes = lodash.map(authorsAndBlogs, (blogArr, author) => {
    return { 
      author,
      totalLikes: lodash.sumBy(blogArr, 'likes') 
    }
  })
  const { author, totalLikes } = lodash.maxBy(authorsTotalLikes, 'totalLikes')

  return { author, likes: totalLikes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}