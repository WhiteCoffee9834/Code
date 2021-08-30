import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        shopCart: []
    },
    getters: {
        // 计算总数量
        allCount(state) {
            let numCount = 0
            state.shopCart.forEach(item => {
                if (item.flag) {
                    numCount += item.num
                }
            })
            return numCount
        },
        // 计算总价格
        allPriceCount(state) {
            let priceCount = 0
            state.shopCart.forEach(item => {
                if (item.flag) {
                    priceCount += item.num * item.price
                }
            })
            return priceCount
        }
    },
    mutations: {
        // 添加到购物车的方法,存在三种情况
        addCart(state, obj) {
            let index = state.shopCart.findIndex(item=>item.first_cateid == obj.first_cateid)
            Vue.set(obj, "num", 1) // 新增一个键名,键值为1.用来计数
            Vue.set(obj, "flag", false) // 新增一个用于判断是否选中的键值对
            if(state.shopCart.length == 0 || index == -1){ // 如果购物车无项目或者购物车中没有查找到该项
                state.shopCart.push(obj) // 则新增该项
            }else{ // 否则查找到该项目,并将它的num + 1
                Vue.set(state.shopCart[index], "num", state.shopCart[index].num + 1)
            }
        },
        // 对购物车中的物品进行数量加减
        changeCount(state, {
            first_cateid,
            type
        }) {
            let index = state.shopCart.findIndex(item => item.first_cateid == first_cateid)
            if (type == "inc") {
                Vue.set(state.shopCart[index], "num", state.shopCart[index].num + 1)
            } else {
                if (state.shopCart[index].num > 0) {
                    Vue.set(state.shopCart[index], "num", state.shopCart[index].num - 1)
                }
            }
        },
        // 更改选中情况
        changeFlag(state, first_cateid) {
            let index = state.shopCart.findIndex(item => item.first_cateid == first_cateid)
            Vue.set(state.shopCart[index], "flag", !state.shopCart[index].flag)
        },
        // 全选时改变数组中所有的flag
        changeAll(state, effect) {
            state.shopCart.forEach(element => {
                return element.flag = effect
            });
        }
    }
})