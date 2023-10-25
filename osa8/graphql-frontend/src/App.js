import { useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import Login from "./components/Login"
import Recommend from "./components/Recommend"
import { useApolloClient, useSubscription } from "@apollo/client"
import { BOOK_ADDED } from "./queries"

const App = () => {
  const [page, setPage] = useState("login")
  const [token, setToken] = useState(localStorage.getItem("user-token"))
  const [error, setError] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const displayError = (err) => {
    setError(err)
    setTimeout(() => {
      setError("")
    }, 4000)
  }

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const book = data.data?.bookAdded
      window.alert(`New book added: ${book.title} by ${book.author.name}`)
    },
  })

  return (
    <div>
      {token ? (
        <div>
          <p>{error}</p>
          <button onClick={() => setPage("authors")}>authors</button>
          <button onClick={() => setPage("books")}>books</button>
          <button onClick={() => setPage("recommend")}>recommend</button>

          <button onClick={() => setPage("add")}>add book</button>
          <button onClick={() => logout()}>logout</button>
        </div>
      ) : (
        <button onClick={() => setPage("login")}>login</button>
      )}

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <Recommend show={page === "recommend"} />

      <NewBook show={page === "add"} setError={displayError} />

      <Login
        show={page === "login"}
        setError={displayError}
        setToken={setToken}
      />
    </div>
  )
}

export default App
