import axios from '@/utils/http'

// 登录请求 api
export const login = (formdata) => {
    return axios({
        url:'/accounts/login',
        method:'post',
        data: formdata
    })
}

// 验证码获取api
export const getCaptcha = (tel) => {
    return axios({
        url: '/captchas',
        method: 'post',
        data: {
            tel
        }
    })
}	

