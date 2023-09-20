import PropTypes from "prop-types"
const BlogForm = ({
  handleCreate,
  handleAuthorChange,
  handleTitleChange,
  handleUrlChange,
  author,
  title,
  url,
}) => {
  return (
    <form onSubmit={handleCreate}>
      <div>
        title
        <input
          type="text"
          className="title"
          value={title}
          onChange={handleTitleChange}
        ></input>
      </div>
      <div>
        author
        <input
          type="text"
          className="author"
          value={author}
          onChange={handleAuthorChange}
        ></input>
      </div>
      <div>
        url
        <input
          type="text"
          className="url"
          value={url}
          onChange={handleUrlChange}
        ></input>
      </div>
      <button type="submit">create</button>
    </form>
  )
}

BlogForm.propTypes = {
  handleCreate: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func,
  handleTitleChange: PropTypes.func,
  handleUrlChange: PropTypes.func,
  author: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string,
}

export default BlogForm
