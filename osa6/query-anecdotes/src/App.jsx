import AnecdoteForm from "./components/AnecdoteForm"
import Notification from "./components/Notification"
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import axios from "axios"
import { getAnecdotes } from "./requests"
import { useState } from "react"

const App = () => {
  const handleVote = (anecdote) => {
    console.log("vote")
  }

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
  })

  if (result.isLoading) {
    return <div>Loading...</div>
  } else if (result.isError) {
    return <div>Anecdote service not available due to server problems</div>
  }
  const anecdotes = result.data

  const reloadAnecdotes = () => {
    result.refetch()
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm reloadAnecdotes={reloadAnecdotes} />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
