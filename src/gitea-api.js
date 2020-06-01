import axios from 'axios'

// TODO: set Gitea token here
const accessToken = ''

const instance = axios.create({
    baseURL: 'http://25.31.114.58:3000/api/v1'
})
instance.defaults.headers.common.Authorization = accessToken

export default instance
