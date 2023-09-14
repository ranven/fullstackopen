const _ = require("lodash")

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

const mostBlogs = (blogs) => {
  let authorsBlogs = _(blogs)
    .groupBy("author")
    .map((listOfBlogs, author) => ({
      author: author,
      blogs: listOfBlogs.length,
    }))
    .sortBy("blogs")
    .value()

  return authorsBlogs[authorsBlogs.length - 1]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
