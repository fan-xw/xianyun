// 创建一个axios
import axios from 'axios'

const http = axios.create({
    baseURL:'http://157.122.54.189:9095'
})

http.interceptors.response

// 暴露
export default http