import PropTypes from "prop-types"

import { useState, useEffect } from "react"
import userService from "../services/users"

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then((users) => {
      setUsers(users)
    })
  }, [])

  return (
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
              <td>{u.username}</td>
              <td>{u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
