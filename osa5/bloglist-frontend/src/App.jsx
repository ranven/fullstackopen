import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import { Notification } from "./components/Notification"
import BlogForm from "./components/BlogForm"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState("")
  const [error, setError] = useState(false)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [createVisible, setCreateVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
    const loggedUserJSON = window.localStorage.getItem("loggedInUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem("loggedInUser", JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      displayNotification("wrong credentials", true)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
    setCreateVisible(!createVisible)
    displayNotification("Logged out", false)
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.createBlog({ title, author, url })
      setTitle("")
      setAuthor("")
      setUrl("")
      setBlogs(blogs.concat(newBlog))
      displayNotification(`a new blog ${title} by ${author} added`, false)
      setCreateVisible(!createVisible)
    } catch (exception) {
      displayNotification("invalid input", true)
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
          <button type="submit" onClick={handleLogout}>
            log out
          </button>
          <div style={{ display: createVisible ? "" : "none" }}>
            <h2>create</h2>
            <BlogForm
              author={author}
              title={title}
              url={url}
              handleAuthorChange={({ target }) => setAuthor(target.value)}
              handleTitleChange={({ target }) => setTitle(target.value)}
              handleUrlChange={({ target }) => setUrl(target.value)}
              handleCreate={handleCreate}
            ></BlogForm>
          </div>
          <button onClick={() => setCreateVisible(!createVisible)}>
            {createVisible ? "cancel" : "new blog"}
          </button>
          <hr />
          {blogList()}
        </div>
      )}
    </div>
  )
}

export default App
