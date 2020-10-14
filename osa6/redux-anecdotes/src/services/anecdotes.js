import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  return getResponseBody(axios.get(baseUrl))
}

const createNew = async anecdote => {
    return getResponseBody(axios.post(baseUrl, anecdote))
  }

  const update = async anecdote => {
    return getResponseBody(axios.put(`${baseUrl}/${anecdote.id}`, anecdote))
  }

  const getResponseBody = async operation => {
    const response = await operation
    return response.data
  }

  const getSingle = async id => {
    return getResponseBody(axios.get(`${baseUrl}/${id}`))
  }

export default { 
    getAll,
    createNew,
    update,
    getSingle
}