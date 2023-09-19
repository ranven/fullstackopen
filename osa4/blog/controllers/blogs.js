const Blog = require("../models/blog")
const blogRouter = require("express").Router()

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
  res.json(blogs)
})

blogRouter.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

blogRouter.delete("/:id", async (req, res) => {
  const user = req.user
  const blog = await Blog.findById(req.params.id)

  if (user._id.toString() === blog.user.toString()) {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } else {
    res
      .status(401)
      .json({ error: "User has no permission to delete this blog" })
  }
})

blogRouter.post("/", async (req, res) => {
  const body = req.body
  const user = req.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
    user: user.id,
  })

  if (body.title && body.url) {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    res.status(201).json(savedBlog)
  } else {
    res.status(400).end()
  }
})

blogRouter.put("/:id", async (req, res) => {
  const body = req.body
  const user = req.user

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
    user: user.id,
  }

  if (user) {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
      new: true,
    })
    res.status(201).json(updatedBlog)
  } else {
    res.status(401).end()
  }
})

module.exports = blogRouter
