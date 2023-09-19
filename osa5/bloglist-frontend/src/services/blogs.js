import axios from "axios"
const baseUrl = "/api/blogs"
let token = null

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const createBlog = async (newBlog) => {
  const config = { headers: { Authorization: token } }
  const res = await axios.post(baseUrl, newBlog, config)
  return res.data
}

export default { getAll, setToken, createBlog }
