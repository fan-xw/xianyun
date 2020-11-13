export const state = () => ({
    // 创一个历史记录数组，里面每一个对象都是一个记录，每个记录有五个数据，拼接起来就可以实现一次搜索
    historyList:[
        
    ]
})

export const mutations = {
    addHistory(state,data) {
        state.historyList.unshift(data)

        // 假如只想保存五条历史记录
        if (state.historyList.lenght > 5) {
            state.historyList.pop()
        }
    },

}