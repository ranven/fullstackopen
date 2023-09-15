const bcrypt = require("bcrypt")
const User = require("../models/user")
const helper = require("./test_helper")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)

describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("sekret", 10)
    const user = new User({ username: "root", passwordHash })

    await user.save()
  })

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    }

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    expect(result.body.error).toContain("expected `username` to be unique")

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

test("creation fails with proper statuscode and message if username or password isnt sufficient", async () => {
  const usersAtStart = await helper.usersInDb()

  const users = [
    {
      name: "noUserName",
      password: "noUserName",
    },
    {
      name: "noPassword",
      username: "noPassword",
    },
    {
      name: "tooShortUsername",
      username: "t",
      password: "tooShort",
    },
    {
      name: "tooShortPassword",
      username: "tooShort",
      password: "t",
    },
  ]

  const noUserNameResult = await api
    .post("/api/users")
    .send(users[0])
    .expect(400)
    .expect("Content-Type", /application\/json/)

  expect(noUserNameResult.body.error).toContain("username is required")

  const noPasswordResult = await api
    .post("/api/users")
    .send(users[1])
    .expect(400)
    .expect("Content-Type", /application\/json/)
  expect(noPasswordResult.body.error).toContain("password is required")

  const tooShortUsernameResult = await api
    .post("/api/users")
    .send(users[2])
    .expect(400)
    .expect("Content-Type", /application\/json/)
  expect(tooShortUsernameResult.body.error).toContain(
    "username has to be at least 3 characters long"
  )

  const tooShortPasswordResult = await api
    .post("/api/users")
    .send(users[3])
    .expect(400)
    .expect("Content-Type", /application\/json/)
  expect(tooShortPasswordResult.body.error).toContain(
    "password has to be at least 3 characters long"
  )

  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd).toHaveLength(usersAtStart.length)
})
