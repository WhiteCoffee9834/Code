import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: parse(sessionStorage.getItem("user")) || null
    },
    mutations: {
        changeUser(state, info) {
            state.user = info
        }
    },
    getters: {
        // 获取权限,让不同的用户登录时只有对应的可操作项
        menus(state) {
            return state.user ? state.user.menus : []
        }
    },
    actions: {
        login({
            commit
        }, {
            username,
            password
        }) {
            // 要返回一个promise对象,这样就能判断登录是否成功
            return new Promise((resolve) => {
                axios.post("/api/userlogin", {
                    username,
                    password
                }).then(res => {
                    if (res.data.code == 200) {
                        commit("changeUser", res.data.list)
                        sessionStorage.setItem("user", JSON.stringify(res.data.list))
                        resolve("Success")
                    } else {
                        resolve("Failed")
                    }
                })
            })
        }
    },
    modules: {}
})
// 从本地存储中拿值,然后通过state中的数据调用,解决页面刷新后数据丢失
/**
 * @param {string} string
 */
function parse(string) {
    try {
        return JSON.parse(string)
    } catch (error) {
        return error
    }
}