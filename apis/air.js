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

// 推荐机票api请求
export const airsSale = () => {
    return axios ({
        url:'airs/sale',
    })
}

// 机票列表api请求
export const airsList = (params) => {
    return axios({
        url:'/airs',
        params
    })
}


