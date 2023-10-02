import axios from "axios"
const baseUrl = "http://localhost:3001/anecdotes"

export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data)

export const addNew = (anecdote) => {
  axios.post(baseUrl, anecdote).then((res) => res.data)
}

export const voteAnecdote = async (anecdote) => {
  const updatedAnecdote = {
    ...anecdote,
    votes: (anecdote.votes ? anecdote.votes : 0) + 1,
  }
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, updatedAnecdote)
  return response.data
}
