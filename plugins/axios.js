// onRequest(config) 请求 (配置)
// onResponse(response) 响应
// onError(err)  
// onRequestError(err)  在请求中(错误)
// onResponseError(err) 在响应中(错误)
// 默认情况下，这些函数不必返回任何内容


// 如果在插件里面需要获取到 nuxt 本身
// 需要 export default,  如果我们知道要什么，比如axios，就可以直接解构出来

export default function({$axios}) {
    $axios.onError(err=>{
        // 这里是每当出错的时候都会被拦截
        console.log(err);
    })
}