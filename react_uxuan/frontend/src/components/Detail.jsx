import React, { Component } from 'react'
import { Carousel, WingBlank } from 'antd-mobile';
import "../css/Detail.css"

export default class Detail extends Component {
    state = {
        list: {
            goodsname: "",
            price: "",
            market_price: "",
        },
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
        imgHeight: 176,
    }
    componentDidMount() {
        let { id } = this.props.match.params
        this.$axios.get("/api/getgoodsinfo?id=" + id).then(res => {
            if (res.data.code === 200) {
                this.setState({
                    list: res.data.list[0]
                })
            }
        })
    }
    back=()=>{
        this.props.history.go(-1)
    }
    addShopCart=()=>{
        let uid = sessionStorage.getItem("uid")
        let {id} = this.props.match.params
        uid !== null
        ?
        this.$axios.post("/api/cartadd",{uid:uid,type:"1",goodsid:id,num:1})
        :
        this.props.history.push({pathname:"/login",search:"?path=/detail/"+id})
    }
    redirectToShopCart=()=>{
        this.props.history.push("/shopcart")
    }
    render() {
        return (
            <main id="detail">
                <header>
                    <div className="headNameBox">
                        <button onClick={this.back}>Back</button>
                        <h2>
                            {this.state.list.goodsname}
                        </h2>
                    </div>
                    <div className="buttonBox">
                        <button>商品</button>
                        <button>评价</button>
                        <button>详情</button>
                        <button>推荐</button>
                    </div>
                </header>
                <WingBlank>
                    <Carousel
                        autoplay={true}
                        infinite
                        autoplayInterval={1000}
                    >
                        {this.state.data.map((val,index) => (
                            <img
                                key={index}
                                src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top' }}
                                onLoad={() => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({ imgHeight: 'auto' });
                                }}
                            />
                        ))}
                    </Carousel>
                </WingBlank>
                <article>
                    <div className="priceBox">
                        <span>&yen;{this.state.list.price}</span>
                        <span>&yen;{this.state.list.market_price}</span>
                    </div>
                    <div className="description">
                        <span>描述占位</span>
                    </div>
                </article>
                <div className="footer">
                    <div>客服</div>
                    <div>店铺</div>
                    <div onClick={this.redirectToShopCart}>购物车</div>
                    <div className="addShopCart" onClick={this.addShopCart}>加入购物车</div>
                    <div className="buyNow">立即购买</div>
                </div>
            </main >
        )
    }
}