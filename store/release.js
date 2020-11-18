// 草稿箱
export const state = () => ({
    draftboxList: []
})

export const mutations = {
    DraftBox(state, data) {
        // 判断，如果不存在完全一样的数据再进行添加
        let isDiaft = true
        state.draftboxList.forEach(draft => {
            if (
                draft.title == data.title &&
                draft.content == data.content &&
                draft.city == data.city
            ) {
                isDiaft = false
            }
        });
        if (isDiaft) {
            state.draftboxList.unshift(data)
        }

        if (state.draftboxList.length > 5) {
            state.draftboxList.length = 5
        }

    },
    // 删除
    delDraft(state, index) {
        state.draftboxList.splice(index, 1)
    }
}