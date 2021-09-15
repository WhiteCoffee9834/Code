import React, { Component } from 'react'
import "../css/Login.css"
import qs from "querystring"
export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: ""
        }
    }

    change(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    login = () => {
        if (this.state.username.trim() !== "" && this.state.password.trim() !== "") {
            this.$axios.post("/api/login",{phone:this.state.username,password:this.state.password}).then(res=>{
                if(res.data.code === 200){
                    sessionStorage.setItem("uid", res.data.list.uid)
                    sessionStorage.setItem("user", res.data.list.phone)

                    let path = this.props.location.search.slice(1)
                    let url = qs.parse(path)
                    
                    if (path !== "") {
                        this.props.history.replace(url.path)
                    } else {
                        this.props.history.replace("/homepage")
                    }
                }else{
                    alert(res.data.msg)
                }
            })
        } else {
            alert("用户名或密码不能为空")
        }
    }

    back=()=>{
        this.props.history.go(-1)
    }
    render() {
        return (
            <main id="login">
                <header>
                    <button onClick={this.back}>Back</button>
                    <h2>手机登录</h2>
                </header>
                <section>
                    <div className="imgBox"></div>
                    <div className="loginBox">
                        <input
                            type="text"
                            name="username"
                            value={this.state.username}
                            placeholder="请输入用户名"
                            onChange={this.change.bind(this)}
                        />
                        <input
                            type="password"
                            name="password"
                            value={this.state.password}
                            placeholder="请输入密码"
                            onChange={this.change.bind(this)}
                        />
                        <button onClick={this.login}>登录</button>
                    </div>
                </section>
            </main>
        )
    }
}
