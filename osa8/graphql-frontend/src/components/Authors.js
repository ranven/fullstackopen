import { useQuery, useMutation } from "@apollo/client"
import { useState } from "react"
import { EDIT_BORN, ALL_AUTHORS } from "../queries"

const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS, { pollInterval: 5000 })
  const [activeAuthor, setActiveAuthor] = useState("")
  const [born, setBorn] = useState("")
  const [editBorn] = useMutation(EDIT_BORN)

  if (!props.show) {
    return null
  }

  if (authors.loading) {
    return <div>loading...</div>
  }
  const submit = async (event) => {
    event.preventDefault()
    const editedAuthor = {
      name: activeAuthor,
      born,
    }
    editBorn({ variables: { ...editedAuthor } })
    setActiveAuthor("")
    setBorn("")
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={submit}>
        <label>Choose the author</label>
        <select
          name="activeAuthor"
          onChange={({ target }) => setActiveAuthor(target.value)}
        >
          <option label=" "></option>{" "}
          {authors.data.allAuthors.map((author) => (
            <option value={author.name} key={author.name}>
              {author.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={born}
          onChange={({ target }) => setBorn(Number(target.value))}
        ></input>
        <button type="submit">edit author</button>
      </form>
    </div>
  )
}

export default Authors
