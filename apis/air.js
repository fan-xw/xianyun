import axios from '@/utils/http'

// 实时机票城市api请求
export const airCity = (name) => {
    return axios({
        url:'/airs/city',
        params:{
            name
        }
    })
}


