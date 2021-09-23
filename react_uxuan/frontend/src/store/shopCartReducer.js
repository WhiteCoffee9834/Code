import { GETDATA, CHANGESELECT, CHANGESELECTALL, CHANGENUMBER,DEL} from "../constants/ActionTypes"
const initialState = {
    list: []
}

export default (state = initialState, { type, payload }) => {
    let newState = JSON.parse(JSON.stringify(state))
    let arr = []
    switch (type) {
        // TAG 获取购物车数据
        case GETDATA:
            if (payload.length !== 0) {
                payload.forEach(element => {
                    if (element.content !== null) {
                        element.content.forEach(x => {
                            x.checked = false
                            arr.push(x)
                        })
                    }
                });
            }
            newState.list = arr
            return newState
            // TAG 物品选中状态
        case CHANGESELECT:
            let index = newState.list.findIndex(x => x.id === payload.id)
            newState.list[index].checked = !newState.list[index].checked
            return newState
            // TAG 全选按钮的点击
        case CHANGESELECTALL:
            newState.list.forEach(element => {
                element.checked = !element.checked
            })
            return newState
            // TAG 购物车物品数量加减
        case CHANGENUMBER:
            let {type} = payload
            let index2 = newState.list.findIndex(x=>payload.item.id === x.id)
            newState.list[index2].num+=type
            return newState
        case DEL:
            let index3 = newState.list.findIndex(x => x.id === payload.id)
            newState.list.splice(index3,1)
            return newState
        default:
            return state
    }
}