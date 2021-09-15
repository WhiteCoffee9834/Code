import React, { Component } from 'react'
import { connect } from "react-redux"
import "../css/ShopCart.css"
import ActionCreator from '../action/ActionCreator'
import { createSelector } from "reselect"
class ShopCart extends Component {
    componentDidMount() {
        this.props.getData()
    }

    change = (x) => {
        this.props.changeSelect(x)
    }

    selectAllButton = () => {
        this.props.selectAllButton()
    }

    numberChange(type){
        this.props.changeNumber(type)
    }

    render() {
        return (
            <main id="shopcart">
                <header>
                    <h2>购物车</h2>
                    <div className="buttonBox">
                        <button>全部</button>
                        <button>降价</button>
                        <button>常卖</button>
                        <button>分类</button>
                    </div>
                </header>
                <article>
                    <ul>
                        {/* <li>
                            <input type="checkbox" /> 普通商品
                        </li> */}
                        {
                            this.props.ShopCart.list.map(item => {
                                switch (item.type) {
                                    case 1:
                                        return (
                                            <li key={item.id}>
                                                <div className="selectBox">
                                                    <input type="checkbox" checked={item.checked} onChange={this.change.bind(this, item)} />
                                                </div>
                                                <div className="imgBox">
                                                    <img src={item.img} alt="" />
                                                </div>
                                                <div className="info">
                                                    <div className="goodsName">{item.goodsname}</div>
                                                    <p>&yen;{item.price}</p>
                                                    <div className="numberBox">
                                                        <button onClick={this.numberChange.bind(this,{type:-1,item})}>-</button>
                                                        <span>{item.num}</span>
                                                        <button onClick={this.numberChange.bind(this,{type:1,item})}>+</button>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    default:
                                        break;
                                }
                            })
                        }
                    </ul>
                </article>
                <footer>
                    <div className="allSelectBox">
                        <input type="checkbox" id="all" checked={this.props.selectAllEffect} onChange={this.selectAllButton} />
                    </div>
                    <label htmlFor="all">
                        <p className="allSelectDecoration" >全选</p>
                    </label>
                    <p className="priceCountBox">
                        <span>数量总和:{this.props.countSum}</span>
                        <span>价格总和:
                            <b className="price">&yen;{this.props.priceSum.toFixed(2)}</b>
                        </span>
                    </p>
                    <button>结算</button>
                </footer>
            </main>
        )
    }
}
// TAG 全选钮状态
let selectAllEffect = createSelector(
    state => {
        return state.ShopCart.list
    },
    list => {
        return list.every(x => x.checked)
    }
)
// TAG 总数量
let countSum = createSelector(
    state => state.ShopCart.list,
    list => {
        return list.reduce((a, b) => a + (b.checked ? b.num : 0), 0)
    }
)
// TAG 总价
let priceSum = createSelector(
    state => state.ShopCart.list,
    list => {
        return list.reduce((a, b) => a + (b.checked ? b.num * b.price : 0), 0)
    }
)
let mapState = (state) => {
    return {
        ...state,
        selectAllEffect: selectAllEffect(state),
        countSum: countSum(state),
        priceSum: priceSum(state)
    }
}
export default connect(mapState, ActionCreator)(ShopCart)