import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import BlogForm from "./components/BlogForm"
import blogService from "./services/blogs"
import loginService from "./services/login"
import { useDispatch } from "react-redux"
import { setNotification } from "./reducers/notificationReducer"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Users from "./components/Users"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [createVisible, setCreateVisible] = useState(false)
  const [updateBlogList, setUpdateBlogList] = useState(false)

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    })
  }, [updateBlogList])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const dispatch = useDispatch()

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
      dispatch(setNotification("wrong creadentials"))
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
    setCreateVisible(!createVisible)
    dispatch(setNotification("logged out"))
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.createBlog({ title, author, url })
      setTitle("")
      setAuthor("")
      setUrl("")
      setBlogs(blogs.concat(newBlog))
      dispatch(setNotification(`a new blog ${title} by ${author} added`))
      setCreateVisible(!createVisible)
      setUpdateBlogList(!updateBlogList)
    } catch (exception) {
      dispatch(setNotification("Invalid input"))
    }
  }

  const updateBlog = async (updatedBlog, blogId) => {
    try {
      await blogService.updateBlog(updatedBlog, blogId)
      setUpdateBlogList(!updateBlogList)
      dispatch(setNotification("Liked"))
    } catch (exception) {
      dispatch(setNotification("Couldn't send like"))
    }
  }

  const deleteBlog = async (blogId) => {
    try {
      await blogService.deleteBlog(blogId)
      setBlogs(blogs.filter((b) => b.id !== blogId))
      dispatch(setNotification("deleted blog"))
    } catch (exception) {
      dispatch(setNotification("couldn't delete blog"))
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          id="username"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          id="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id="login-button">
        login
      </button>
    </form>
  )

  const blogList = () => (
    <div id="blog-list">
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
          isOwner={blog.user?.id === user.id}
        />
      ))}
    </div>
  )

  const createForm = () => (
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
  )

  return (
    <Router>
      <h1>Blogs</h1>

      <Notification />

      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button type="submit" onClick={handleLogout}>
            log out
          </button>
        </div>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <div>
              {!user && loginForm()}
              {user && (
                <div>
                  {createForm()}
                  <button
                    id="create-button"
                    onClick={() => setCreateVisible(!createVisible)}
                  >
                    {createVisible ? "cancel" : "new blog"}
                  </button>
                  <hr />
                  {blogList()}
                </div>
              )}
            </div>
          }
        />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
  )
}

export default App
