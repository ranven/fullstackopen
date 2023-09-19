import { useState } from "react"
const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    setVisible(!visible)
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
          {blog.likes} likes <button onClick={console.log("like")}>like</button>
        </p>
        <p>{blog.author}</p>
      </div>
    </div>
  )
}

export default Blog
