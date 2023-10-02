import { useQueryClient, useMutation } from "@tanstack/react-query"
import { addNew } from "../requests"

// eslint-disable-next-line react/prop-types
const AnecdoteForm = ({ reloadAnecdotes }) => {
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(addNew, {
    onSuccess: async (newAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] })
      reloadAnecdotes()
    },
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
