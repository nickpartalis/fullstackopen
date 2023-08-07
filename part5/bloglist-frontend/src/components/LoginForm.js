import { useState } from 'react'


const LoginForm = ({ loginUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    loginUser(username, password)
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Log in</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          Password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm