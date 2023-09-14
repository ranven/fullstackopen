const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")

const api = supertest(app)
const Blog = require("../models/blog")
const helper = require("./test_helper")

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.testBlogs)
})

test("blogs get returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)
})

test("all blogs get returned", async () => {
  const res = await api.get("/api/blogs")
  expect(res.body).toHaveLength(helper.testBlogs.length)
})

test("blogs' identifying field is called id", async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToView = blogsAtStart[0]
  const resBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/)
  expect(resBlog.body).toBeDefined()
})

test("blog can be added", async () => {
  const newBlog = {
    title: "Test",
    author: "Test",
    url: "Test",
    likes: 1,
  }
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/)

  const blogsCount = await helper.blogsInDb()
  const expectedCount = helper.testBlogs.length + 1
  expect(blogsCount).toHaveLength(expectedCount)
})

test("likes default to 0 if not defined", async () => {
  const newBlog = {
    title: "Test",
    author: "Test",
    url: "Test",
  }
  const savedBlog = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/)

  expect(savedBlog.body.likes).toEqual(0)
})

test("new blog without title or url returns a 400 status code", async () => {
  const noTitleBlog = {
    author: "Test",
    url: "Test",
  }
  const noUrlBlog = {
    author: "Test",
    title: "Test",
  }
  await api.post("/api/blogs").send(noTitleBlog).expect(400)
  await api.post("/api/blogs").send(noUrlBlog).expect(400)
})

test("can update blog", async () => {
  const blogs = await helper.blogsInDb()
  const blogToUpdate = blogs[0]
  const newInfo = {
    title: "Test",
    author: blogToUpdate.author,
    likes: 1000,
    url: blogToUpdate.url,
  }

  const updatedBlog = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newInfo)
    .expect(200)
    .expect("Content-Type", /application\/json/)

  expect(updatedBlog.body.title).not.toEqual(blogToUpdate.title)
  expect(updatedBlog.body.title).toEqual(newInfo.title)
  expect(updatedBlog.body.likes).not.toEqual(blogToUpdate.likes)
})

test("can delete blog", async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toEqual(blogsAtStart.length - 1)
  expect(blogsAtEnd).not.toContain(blogToDelete)
})

afterAll(async () => {
  await mongoose.connection.close()
})
