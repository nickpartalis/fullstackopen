import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [expanded, setExpanded] = useState(false)

  const addLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    handleLike(updatedBlog, blog.id)
  }

  return (
    <div className='blog'>
      <div>
        {blog.title} - {blog.author}
        <button className='mrgn-left' onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Hide' : 'View'}
        </button>
      </div>
      {expanded &&
        <div>
          <div>{blog.url}</div>
          <div>
            Likes: {blog.likes}
            <button className='mrgn-left' onClick={addLike}>Like</button>
          </div>
          <div>{blog.user.username}</div>

          {user.username === blog.user.username &&
            <button onClick={() => handleDelete(blog)}>Remove</button>
          }
        </div>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog