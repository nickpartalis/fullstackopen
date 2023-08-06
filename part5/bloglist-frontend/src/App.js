import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from "./components/LoginForm"
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
      .then(blogs => setBlogs(blogs))
    console.log(blogs)
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    }, 5000)
  }

  const handleLogin = async (username, password) => {
    try {
      const loggedInUser = await loginService.login({ username, password })
      blogService.setToken(loggedInUser.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(loggedInUser)
      ) 
      setUser(loggedInUser)
      showNotification({type: "notice", message: 'Logged in.'})
    }
    catch (err) {
      const message = err.response.data.error || err.message
      showNotification({type: "error", message: `Login failed: ${message}`})
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    showNotification({type: "notice", message: 'Logged out.'})
  }

  const handleCreateNew = async (blogObj) => {
    try {
      const newBlog = await blogService.create(blogObj)
      setBlogs(blogs.concat(newBlog))
      showNotification({
        type: "notice", 
        message: `Blog "${newBlog.title}" by ${newBlog.author} added.`
      })
      newBlogFormRef.current.toggleVisibility()
    }
    catch (err) {
      const message = err.response.data.error || err.message
      showNotification({type: "error", message: `Adding blog failed: ${message}`})
    }
  }

  return (
    <div>
      <Notification {...notification} />
      {!user && <LoginForm loginUser={handleLogin} />}
      {user && <div>
        <p>{user.username} logged in
        <button onClick={handleLogout}>Logout</button>
        </p>

        <Togglable buttonLabel='New Blog' ref={newBlogFormRef}>
          <NewBlogForm createNew={handleCreateNew} />
        </Togglable>

        <h2>Blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>}
      
    </div>
  )
}

export default App