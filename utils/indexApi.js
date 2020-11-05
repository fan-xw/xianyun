
// 如果是插件
import axios from './http'

export const banners = function () {
    return axios ({
        url:'/scenics/banners'
    })
}