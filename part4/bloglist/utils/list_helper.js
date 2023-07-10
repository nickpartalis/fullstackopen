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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}