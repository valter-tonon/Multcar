import axios from "axios";

export default axios.create({
    baseURL: 'http://localhost:4500/'
})

export const apiAuth = axios.create({
    baseURL: 'http://localhost:4500/api/'
})

apiAuth.interceptors.request.use(
    async (config) => {
        config.headers.authorization = 'Bearer ' + await localStorage.getItem('access_token')
        return config
    }
)

apiAuth.interceptors.response.use( response => {
    return response
    }, error => {
    if(error.response.status === 401) {
        localStorage.removeItem('access_token')
        window.location.replace('login')
    }
})