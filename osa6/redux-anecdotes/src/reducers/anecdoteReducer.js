import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    updateAnecdote(state, action) {
      const updatedAnecdote = action.payload
      return state.map((a) =>
        a.id !== updatedAnecdote.id ? a : updatedAnecdote
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { setAnecdotes, updateAnecdote, appendAnecdote } =
  anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.vote(id)
    dispatch(updateAnecdote(updatedAnecdote))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.addNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer
