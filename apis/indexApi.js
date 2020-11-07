
// 如果是插件
import axios from '@/utils/http'

export const banners = function () {
    return axios ({
        url:'/scenics/banners'
    })
}