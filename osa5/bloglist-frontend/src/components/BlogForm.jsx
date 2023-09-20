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
        <input type="text" value={title} onChange={handleTitleChange}></input>
      </div>
      <div>
        author
        <input type="text" value={author} onChange={handleAuthorChange}></input>
      </div>
      <div>
        url
        <input type="text" value={url} onChange={handleUrlChange}></input>
      </div>
      <button type="submit">create</button>
    </form>
  )
}

BlogForm.propTypes = {
  handleCreate: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

export default BlogForm
