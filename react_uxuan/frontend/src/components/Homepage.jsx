import React, { Component } from 'react'
import "../css/Homepage.css"
export default class homepage extends Component {
    componentWillUnmount(){
        this.setState=()=>{
            return
        }
    }
    render() {
        return (
            <main id="homepage">
                <header>
                    <div className="logo">橙心优选</div>
                    <input type="text" placeholder="搜索商品" />
                </header>
            </main>
        )
    }
}