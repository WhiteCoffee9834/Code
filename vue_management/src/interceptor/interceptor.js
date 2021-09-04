import axios from "axios"
axios.interceptors.request.use((config)=>{
    try {
        // TAG 第二层防线--token验证
        // 每次发送请求都需要尝试携带token.
        // 在登录前无法获取到token,需要使用try catch
        config.headers['authorization'] = JSON.parse(sessionStorage.getItem("user")).token
    } catch (error) {
        console.log(error)
    }
    return config
})
export default axios