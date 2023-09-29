import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"

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

  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
