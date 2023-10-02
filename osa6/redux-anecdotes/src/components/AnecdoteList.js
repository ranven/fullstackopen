import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import {
  addNotification,
  setNotification,
} from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter && state.filter.length > 1) {
      return state.anecdotes
        .filter((a) => a.content.includes(state.filter))
        .toSorted((a, b) => b.votes - a.votes)
    }
    return state.anecdotes.toSorted((a, b) => b.votes - a.votes)
  })

  const dispatch = useDispatch()

  const vote = (id, content) => {
    dispatch(voteAnecdote(id))
    dispatch(addNotification(`you voted ${content}`, 5))
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes} votes
            <button onClick={() => vote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
