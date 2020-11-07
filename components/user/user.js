import axios from '@/utils/http'

export const login = (formdata) => {
    return axios({
        url:'/accounts/login',
        method:'post',
        data: formdata
    })
}

