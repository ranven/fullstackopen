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
export default BlogForm
