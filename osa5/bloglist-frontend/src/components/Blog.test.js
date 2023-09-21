import React from "react"
import "@testing-library/jest-dom"
import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"
import BlogForm from "./BlogForm"

test("Renders blog content", () => {
  const blog = {
    title: "Component testing",
    author: "Tester",
    likes: 0,
    url: 0,
    id: 12345,
    user: {
      username: "Yeehaw",
      id: "54321",
    },
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText("Component testing by Tester")
  expect(element).toBeDefined()
})

test("Blog displays additional information when clicked", async () => {
  const blog = {
    title: "Component testing",
    author: "Tester",
    likes: 0,
    url: "https://localhost:4200",
    id: 12345,
    user: {
      username: "Yeehaw",
      id: "54321",
    },
  }

  const { container } = render(<Blog blog={blog}></Blog>)
  const infobox = container.querySelector("#blog-info")
  expect(infobox).toHaveStyle({ display: "none" })

  const user = userEvent.setup()
  const button = screen.getByText("view")
  await user.click(button)

  expect(infobox).toHaveTextContent("Yeehaw")
  expect(infobox).toHaveTextContent("0 likes")
  expect(infobox).toHaveTextContent("https://localhost:4200")
})

test("Blog update function is called twice when like is clicked twice", async () => {
  const blog = {
    title: "Component testing",
    author: "Tester",
    likes: 0,
    url: "https://localhost:4200",
    id: 12345,
    user: {
      username: "Yeehaw",
      id: "54321",
    },
  }

  const mockHandler = jest.fn()
  render(<Blog blog={blog} updateBlog={mockHandler}></Blog>)

  const user = userEvent.setup()
  const button = screen.getByText("like")
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test("When a new blog is submitted, new blog function is called and input is correct", async () => {
  const mockHandler = jest.fn()
  const form = render(<BlogForm handleCreate={mockHandler} />)

  const title = form.container.querySelector("#title")
  const author = form.container.querySelector("#author")
  const url = form.container.querySelector("#url")

  fireEvent.change(title, { target: { value: "testing" } })
  fireEvent.change(url, { target: { value: "testing" } })
  fireEvent.change(author, { target: { value: "testing" } })
  expect(title.value).toBe("testing")
  expect(url.value).toBe("testing")
  expect(author.value).toBe("testing")

  const submit = screen.getByText("create")
  fireEvent.submit(submit)
  expect(mockHandler.mock.calls).toHaveLength(1)
})
