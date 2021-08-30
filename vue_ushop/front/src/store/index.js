import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        shopCart: []
    },
    getters: {
        // 计算总数量
        allCount(state){
            let numCount = 0
            state.shopCart.forEach(item=>{
                if(item.flag){
                    numCount += item.num
                }
            })
            return numCount
        },
        // 计算总价格
        allPriceCount(state){
            let priceCount = 0
            state.shopCart.forEach(item=>{
                if(item.flag){
                    priceCount += item.num * item.price
                }
            })
            return priceCount
        }
    },
    mutations: {
        // 添加到购物车的方法,存在三种情况
        addCart(state, obj) {
            // INFO 如果购物车是空的
            if (state.shopCart.length == 0) {
                // 往对象中添加两个属性并且设置默认值
                Vue.set(obj, "num", 1)
                Vue.set(obj, "flag", false)
                state.shopCart.push(obj)
            }else{
                // INFO 如果不是空的,那么循环遍历购物车
                state.shopCart.forEach((item,index)=>{
                    // 如果存在有相同的ID,则将其自增
                    if(item.first_cateid == obj.first_cateid){
                        Vue.set(state.shopCart[index],"num",state.shopCart[index].num + 1)
                        // INFO 如果不存在,则表明是新的物品,应该往数组中添加该项
                    }else{
                        Vue.set(obj,"num",1)
                        Vue.set(obj,"flag",false)
                        state.shopCart.push(obj)
                    }
                })
            }
        },
        // 对购物车中的物品进行数量加减
        changeCount(state,{first_cateid,type}){
            let index = state.shopCart.findIndex(item=>item.first_cateid == first_cateid)
            if(type == "inc"){
                Vue.set(state.shopCart[index],"num",state.shopCart[index].num + 1)
            }else{
                if(state.shopCart[index].num > 0){
                    Vue.set(state.shopCart[index],"num",state.shopCart[index].num - 1)
                }
            }
        },
        // 更改选中情况
        changeFlag(state,first_cateid){
            let index = state.shopCart.findIndex(item=>item.first_cateid == first_cateid)
            Vue.set(state.shopCart[index],"flag",!state.shopCart[index].flag)
        },
        // 全选时改变数组中所有的flag
        changeAll(state,effect){
            state.shopCart.forEach(element => {
               return element.flag = effect
            });
        }
    }
})