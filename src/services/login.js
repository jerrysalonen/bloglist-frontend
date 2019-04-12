import axios from 'axios'

const base = '/api/login'

const login = async credentials => {
  const res = await axios.post(base, credentials)
  return res.data
}

export default { login }