// 创建一个axios
import axios from 'axios'
import {Message} from 'element-ui';

const http = axios.create({
    baseURL:'http://157.122.54.189:9095'
})

// 响应拦截器
http.interceptors.response.use(
    // 第一个用于状态码200 正常的错误 （成功回调）
    res=>{
        console.log('这里拦截到正常响应状态码为200的请求');
        // 如果是状态码就报错的请求, 这里无法拦截, 需要添加第二个函数作为回调
        // 如果拦截了请求或者响应，记得return
        return res
    },
    // 第二个是状态码本身出错 （失败回调）
    err=>{
        // console.log('这里拦截到状态码本身出错');
        // 这里可以拦截到状态码本身出错的请求
        // console.dir(err)
        Message.error(err.response.data.message || '系统错误')
    }
)

// 暴露
export default http