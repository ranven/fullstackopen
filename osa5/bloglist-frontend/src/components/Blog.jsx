import PropTypes from "prop-types"

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
    <div id="blog-box">
      <div>
        <p>
          {blog.title} by {blog.author}
          <button
            id="view-button"
            onClick={toggleVisible}
            style={{ marginLeft: ".5rem" }}
          >
            {visible ? "hide" : "view"}
          </button>
        </p>
      </div>
      <div id="blog-info" style={{ display: visible ? "" : "none" }}>
        <p>{blog.url}</p>
        <p>
          {blog.likes} likes{" "}
          <button id="like-button" onClick={handleLike}>
            like
          </button>
        </p>
        <p>{blog.user?.username}</p>
        {isOwner ? (
          <>
            <button id="delete-button" onClick={handleDelete}>
              delete
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func,
  deleteBlog: PropTypes.func,
  isOwner: PropTypes.bool,
}

export default Blog
