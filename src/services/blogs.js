import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const postNew = async blogObject => {
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.post(baseUrl, blogObject, config)
  return res.data
}

const update = async (blogObject, newId) => {
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.put(`${baseUrl}/${newId}`, blogObject, config)
  return res.data
}

const remove = async (newId) => {
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.delete(`${baseUrl}/${newId}`, config)
  return res.data
}

export default { setToken, getAll, postNew, update, remove }