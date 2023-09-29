import { useDispatch } from "react-redux"
import anecdoteService from "../services/anecdotes"
import { addAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNew = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ""
    const newAnecdote = await anecdoteService.addNew(anecdote)
    dispatch(addAnecdote(newAnecdote))
    dispatch(setNotification(`you added ${anecdote}`))
    setTimeout(() => {
      dispatch(setNotification(""))
    }, 5000)
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
