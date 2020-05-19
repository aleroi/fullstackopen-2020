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

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, setToken, update }