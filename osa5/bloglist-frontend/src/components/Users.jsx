import { useState, useEffect } from "react"
import userService from "../services/users"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useMatch,
} from "react-router-dom"

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then((users) => {
      setUsers(users)
    })
  }, [])

  const User = () => {
    const id = useMatch("/users/:id").params.id
    const user = users.find((u) => u.id === id)

    if (user) {
      return (
        <div>
          <p>{user.name}</p>
          <p>blogs added</p>
          <ul>
            {user.blogs.map((b) => (
              <li key={b.id}>
                {b.title} by {b.author}
              </li>
            ))}
          </ul>
        </div>
      )
    }
  }

  return (
    <Routes>
      <Route
        path={"/"}
        element={
          <div>
            <h1>users</h1>
            <table>
              <tbody>
                <tr>
                  <td> </td>
                  <td>blogs created</td>
                </tr>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>
                      <a href={"/users/" + u.id}>{u.username}</a>
                    </td>
                    <td>{u.blogs.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
      />
      <Route path={"/:id"} element={User()} />
    </Routes>
  )
}

export default Users
