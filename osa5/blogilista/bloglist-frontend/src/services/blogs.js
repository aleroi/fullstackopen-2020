import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const authHeader = () => { return { headers: { Authorization: token } } }

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async blog => {
  const header = authHeader()
  const response = await axios.post(baseUrl, blog, header)
  return response.data
}

const update = async blog => {
  const request = axios.put(`${baseUrl}/${blog.id}`, blog)
  return request.then(response => response.data)
}

const remove = async blog => {
  const response = await axios.delete(`${baseUrl}/${blog.id}`, authHeader())
  return response.data
}

const getResponseBody = async operation => {
  const response = await operation
  return response.data
}

const getSingle = async id => {
  return getResponseBody(axios.get(`${baseUrl}/${id}`))
}

export default { getAll, create, setToken, update, remove, getSingle }