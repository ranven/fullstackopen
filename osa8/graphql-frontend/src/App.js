import { useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import Login from "./components/Login"
import { useApolloClient } from "@apollo/client"

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

  return (
    <div>
      {token ? (
        <div>
          <p>{error}</p>
          <button onClick={() => setPage("authors")}>authors</button>
          <button onClick={() => setPage("books")}>books</button>
          <button onClick={() => setPage("add")}>add book</button>
          <button onClick={() => logout()}>logout</button>
        </div>
      ) : (
        <button onClick={() => setPage("login")}>login</button>
      )}

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

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
