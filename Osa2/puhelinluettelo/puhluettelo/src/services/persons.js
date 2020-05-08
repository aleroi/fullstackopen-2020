import axios from 'axios'
const url = '/api/persons';

const getAll = () => {
  return object(axios.get(url))
}

const create = newObject => {
  return object(axios.post(url, newObject))
}

const update = (id, newObject) => {
  return object(axios.put(`${url}/${id}`, newObject))
}

const object = (request) => {
    return request.then(response => response.data)
}
const remove = (id) => {
  return axios.delete(`${url}/${id}`)
}


export default {getAll, create, update, remove}