import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState()
  const [notification, setNotification] = useState({})

  useEffect(() => {
    blogService.getAll()
      .then(blogs => blogs.sort((a, b) => b.likes - a.likes))
      .then(sortedBlogs => setBlogs(sortedBlogs))
  }, [JSON.stringify(blogs)]) // prevents infinite GET request loop

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const newBlogFormRef = useRef()

  const showNotification = (notificationObj) => {
    setNotification(notificationObj)
    setTimeout(() => {
      setNotification({})
    }, 3000)
  }

  const handleLogin = async (username, password) => {
    try {
      const loggedInUser = await loginService.login({ username, password })
      blogService.setToken(loggedInUser.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(loggedInUser)
      )
      setUser(loggedInUser)
      showNotification({ type: 'notice', message: 'Logged in.' })
    }
    catch (err) {
      const message = err.response.data.error || err.message
      showNotification({ type: 'error', message: `Login failed: ${message}` })
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    showNotification({ type: 'notice', message: 'Logged out.' })
  }

  const handleCreateNew = async (blogObj) => {
    try {
      const newBlog = await blogService.create(blogObj)
      setBlogs(blogs.concat(newBlog))
      showNotification({
        type: 'notice',
        message: `Blog "${newBlog.title}" by ${newBlog.author} added.`
      })
      newBlogFormRef.current.toggleVisibility()
    }
    catch (err) {
      const message = err.response.data.error || err.message
      showNotification({ type: 'error', message: `Adding blog failed: ${message}` })
    }
  }

  const handleBlogLike = async (blog, id) => {
    await blogService.like(blog, id)
    const newBlogArr = blogs.filter(b => b.id !== id).concat(blog)
    setBlogs(newBlogArr)
  }

  const handleBlogDelete = async (blog) => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        showNotification({ type: 'notice', message: `${blog.title} removed.` })
      }
      catch (err) {
        const message = err.response.data.error || err.message
        showNotification({ type: 'error', message: `Removing blog failed: ${message}` })
      }
    }
  }

  return (
    <div>
      <Notification {...notification} />
      {!user && <LoginForm loginUser={handleLogin} />}
      {user && <div>
        <p>
          {user.username} logged in
          <button className='mrgn-left' onClick={handleLogout}>Logout</button>
        </p>

        <Togglable buttonLabel='New Blog' ref={newBlogFormRef}>
          <NewBlogForm createNew={handleCreateNew} />
        </Togglable>

        <h2>Blogs</h2>
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleBlogLike}
            handleDelete={handleBlogDelete}
            user={user}
          />
        )}
      </div>}

    </div>
  )
}

export default App