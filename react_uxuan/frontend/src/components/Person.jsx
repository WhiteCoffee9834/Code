import React, { Component } from 'react'
import "../css/Person.css"
import avatar from "../image/avatar.jpg"
import img2 from "../image/img2.png"
import img3 from "../image/img3.png"
import img4 from "../image/img4.png"
import img5 from "../image/img5.png"
export default class Person extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: ""
        }
    }
    redirectToLogin = () => {
        console.log(this.props)
        this.props.history.push({ pathname: "/login", search: "?path=/person" })
    }
    logout() {
        sessionStorage.removeItem("user")
        sessionStorage.removeItem("uid")
        window.location.reload()
    }
    componentDidMount() {
        let name = sessionStorage.getItem("user")
        this.setState({
            username: name
        })
    }
    render() {
        return (
            <main id="person">
                <header>
                    <h2>个人中心</h2>
                </header>
                <section className="topSection">
                    <div className="userInfoBox">
                        <div className="avatar">
                            <img src={avatar} alt="" />
                        </div>
                        {
                            sessionStorage.getItem("user")
                                ?
                                <div className="info">
                                    <p>{this.state.username}</p>
                                    <button onClick={this.logout}>注销</button>
                                </div>
                                :
                                <div className="loginButton">
                                    <button onClick={this.redirectToLogin}>登录</button>
                                    <button>注册</button>
                                </div>
                        }
                    </div>
                    <div className="overview">
                        <div>
                            <p>12</p>
                            <p>我的收藏</p>
                        </div>
                        <div>
                            <p>12</p>
                            <p>浏览记录</p>
                        </div>
                        <div>
                            <p>&yen;0</p>
                            <p>我的红包</p>
                        </div>
                        <div>
                            <p>12</p>
                            <p>优惠券</p>
                        </div>
                    </div>
                    <div className="order">
                        <p className="order_head">
                            <span>我的订单</span>
                            <span>全部订单</span>
                        </p>
                        <div>
                            <button>
                                <img src={img2} alt="" />
                                <p>待付款</p>
                            </button>
                            <button>
                                <img src={img3} alt="" />
                                <p>待收货</p>
                            </button>
                            <button>
                                <img src={img4} alt="" />
                                <p>评价</p>
                            </button>
                            <button>
                                <img src={img5} alt="" />
                                <p>售后/退款</p>
                            </button>
                        </div>
                    </div>
                </section>
                <section className="bottomSection">
                    <div className="imgBox"></div>
                    <div className="tools">
                        <div>
                            <div className="img1 img"></div>
                            <span>地址管理</span>
                        </div>
                        <div>
                            <div className="img2 img"></div>
                            <span>我的钱包</span>
                        </div>
                        <div>
                            <div className="img3 img"></div>
                            <span>我的二维码</span>
                        </div>
                        <div>
                            <div className="img4 img"></div>
                            <span>我的小伙伴</span>
                        </div>
                        <div>
                            <div className="img5 img"></div>
                            <span>0元试用</span>
                        </div>
                    </div>
                </section>
            </main>
        )
    }
}
