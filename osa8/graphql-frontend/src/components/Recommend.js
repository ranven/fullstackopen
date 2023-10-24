import { useQuery } from "@apollo/client"
import { ALL_BOOKS, USER } from "../queries"

const Recommend = (props) => {
  const user = useQuery(USER)
  const books = useQuery(ALL_BOOKS, {
    variables: { genre: user.data?.me.favoriteGenre },
  })

  if (!props.show) {
    return null
  }

  if (user.loading || books.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in favorite genre:{" "}
        <b>
          {user.data?.me.favoriteGenre ? user.data.me.favoriteGenre : "all"}
        </b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data?.allBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
