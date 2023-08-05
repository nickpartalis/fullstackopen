import { useState } from 'react'

const Blog = ({ blog }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className='blog'>
      <div>
        {blog.title} - {blog.author}
        <button className='btn' onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Hide' : 'View'}
        </button>
      </div>
      {expanded && 
        <div>
          <div>{blog.url}</div>
          <div>
            Likes: {blog.likes}
            <button className='btn'>Like</button>
          </div>
          <div>{blog.user.username}</div>
        </div>
      }
    </div>  
  )
}

export default Blog