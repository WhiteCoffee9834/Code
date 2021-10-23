import Vue from 'vue'
import Vuex from 'vuex'
import validator from "./validator/validator"
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {validator}
})