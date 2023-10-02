import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const addNew = async (content) => {
  const anecdote = {
    content,
    votes: 0,
  }
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const vote = async (id) => {
  const anecdote = await getOne(id)
  const updatedAnecdote = {
    ...anecdote,
    votes: (anecdote.votes ? anecdote.votes : 0) + 1,
  }
  const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
  return response.data
}

export default { getAll, vote, addNew }
