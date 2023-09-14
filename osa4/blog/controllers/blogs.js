const Blog = require("../models/blog")
const blogRouter = require("express").Router()

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({})
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
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

blogRouter.post("/", async (req, res) => {
  const body = req.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
  })
  if (body.title && body.url) {
    const savedBlog = await blog.save()
    res.status(201).json(savedBlog)
  } else {
    res.status(400).end()
  }
})

blogRouter.put("/:id", async (req, res) => {
  const body = req.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  })
  res.status(200).json(updatedBlog)
})

module.exports = blogRouter
