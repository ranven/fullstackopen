import { useQuery, gql } from "@apollo/client"
import { ALL_BOOKS, ALL_GENRES } from "../queries"
import { useState, useEffect } from "react"

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState("")
  const books = useQuery(ALL_BOOKS)
  const genres = useQuery(ALL_GENRES)

  useEffect(() => {
    books.refetch({ genre: selectedGenre })
  }, [books, selectedGenre])

  useEffect(() => {}, [books.data])

  if (!props.show) {
    return null
  }

  if (books.loading || genres.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>
      <p>in genre {selectedGenre ? selectedGenre : "all"}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.data.allGenres.map((g) => (
          <button key={g} value={g} onClick={() => setSelectedGenre(g)}>
            {g}
          </button>
        ))}
        <button
          key={"reset"}
          value={"reset"}
          onClick={() => setSelectedGenre("")}
        >
          all
        </button>
      </div>
    </div>
  )
}

export default Books
