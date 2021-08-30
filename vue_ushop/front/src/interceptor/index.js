import axios from "axios"
// 请求拦截器
axios.interceptors.request.use((config)=>{
    // config.headers.auth="这是token"
    return config
})

export default axios