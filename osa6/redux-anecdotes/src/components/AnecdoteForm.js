import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { addNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNew = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ""
    dispatch(createAnecdote(anecdote))

    dispatch(addNotification(`you added ${anecdote}`, 5))
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNew}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
