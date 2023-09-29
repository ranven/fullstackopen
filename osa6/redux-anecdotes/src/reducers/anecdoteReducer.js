import { createSlice } from "@reduxjs/toolkit"

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    voteAnecdote(state, action) {
      const votedAnecdote = state.find((a) => a.id === action.payload)
      const updatedAnecdote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1,
      }
      return state.map((a) => (a.id !== action.payload ? a : updatedAnecdote))
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { addAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
