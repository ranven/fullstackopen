const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const favBlog = blogs.reduce((favBlog, blog) => {
    return (favBlog = favBlog.likes > blog.likes ? favBlog : blog)
  }, 0)

  return {
    title: favBlog.title,
    likes: favBlog.likes,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
