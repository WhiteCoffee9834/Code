import React, { Component } from 'react'
import "../css/CategoryChild.css"
export default class CategoryChild extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: null,
            goodsList: []
        }
    }
    componentDidMount() {
        let { id } = this.props.match.params
        this.getData(id)
    }
    componentDidUpdate() {
        let { id } = this.props.match.params
        if(id !== this.state.id){
            this.getData(id)
        }
    }
    componentWillUnmount(){
        this.setState=()=>{
            return
        }
    }
    getData = (id) => {
        this.$axios("/api/getgoods?fid=" + id).then(res => {
            if (res.data.code === 200) {
                this.setState({
                    id : this.props.match.params.id,
                    goodsList: res.data.list
                })
            }
        })
    }
    render() {
        return (
            <article className="right-wrapper">
                {
                    this.state.goodsList.map(item => {
                        return (
                            <section key={item.id}>
                                <div className="imgBox" onClick={this.detail.bind(this,item.id)}>
                                    <img src={item.img} alt="" />
                                </div>
                                <div className="info">
                                    <p>{item.goodsname}</p>
                                    <p>
                                        &yen;{item.price}
                                        <span>&yen;{item.market_price}</span>
                                    </p>
                                    <p>{item.description}</p>
                                    <button onClick={this.addShopCart.bind(this,item.id)}>加入购物车</button>
                                </div>
                            </section>
                        )
                    })
                }
            </article>
        )
    }
    addShopCart(id){
        let uid = sessionStorage.getItem("uid")
        uid !== null
        ?
        this.$axios.post("/api/cartadd",{uid:uid,type:"1",goodsid:id,num:1})
        :
        this.props.history.push({pathname:"/login",search:"?path=/category"})
    }

    detail(id){
        this.props.history.push("/detail/"+id)
    }
}