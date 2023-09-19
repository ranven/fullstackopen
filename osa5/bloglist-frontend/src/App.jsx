import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import { Notification } from "./components/Notification"

import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState("")
  const [error, setError] = useState(false)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      displayNotification("wrong credentials", true)
    }
  }

  const displayNotification = (message, isError) => {
    setError(isError)
    setNotification(message)
    setTimeout(() => {
      setNotification("")
      setError(false)
    }, 4000)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogList = () => (
    <div>
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )

  return (
    <div>
      <h1>Blogs</h1>

      <Notification message={notification} isError={error}></Notification>
      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.username} logged in</p>
          {blogList()}
        </div>
      )}
    </div>
  )
}

export default App
