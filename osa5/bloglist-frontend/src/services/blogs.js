import axios from "axios"
const baseUrl = "/api/blogs"
let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const createBlog = async (newBlog) => {
  const config = { headers: { Authorization: token } }
  const res = await axios.post(baseUlr, newBlog, config)
}

export default { getAll, setToken, createBlog }
