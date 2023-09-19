import { useState } from "react"
const Blog = ({ blog, updateBlog, deleteBlog, isOwner }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    setVisible(!visible)
  }

  const handleLike = () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    }
    updateBlog(updatedBlog, blog.id)
  }

  const handleDelete = () => {
    if (window.confirm(`Delete blog ${blog.title}?`)) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div className="blog-box">
      <div>
        <p>
          {blog.title}
          <button onClick={toggleVisible} style={{ marginLeft: ".5rem" }}>
            {visible ? "hide" : "view"}
          </button>
        </p>
      </div>
      <div style={{ display: visible ? "" : "none" }}>
        <p>{blog.url}</p>
        <p>
          {blog.likes} likes <button onClick={handleLike}>like</button>
        </p>
        <p>{blog.author}</p>
        {isOwner ? (
          <>
            <button onClick={handleDelete}>delete</button>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default Blog
