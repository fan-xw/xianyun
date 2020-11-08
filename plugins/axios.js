// onRequest(config) 请求 (配置)
// onResponse(response) 响应
// onError(err)  
// onRequestError(err)  在请求中(错误)
// onResponseError(err) 在响应中(错误)
// 默认情况下，这些函数不必返回任何内容

// 单独引入 Message
import { Message } from 'element-ui';

// 如果在插件里面需要获取到 nuxt 本身
// 需要 export default,  如果我们知道要什么，比如axios，就可以直接解构出来

export default function({$axios, redirect}) {
    // $axios.onError 是一个 nuxt 提供的辅助拦截器函数
    // 里面可以拦截到错误
    $axios.onError(err=>{
        // 这里是每当出错的时候都会被拦截
        console.dir(err);
        console.log('错误信息是:' + err.response.data.message);
        // 弹出一个提示给用户
        // this.$message.error('')在这里由于不是组件内部，没有 this可以用，所以我们只能采用单独引入 Element-ui当中的 Message 组件
        Message.error(err.response.data.message || '系统错误')

        // 如果需要跳转页面，比如说跳转到登录页: 可以从 nuxt 中拿到 redirect函数即可
        redirect('/user/login')
    })
}