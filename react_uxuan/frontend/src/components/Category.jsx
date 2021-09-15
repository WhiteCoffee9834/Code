import React, { Component } from 'react'
import "../css/Category.css"
import { NavLink, Route, Switch, Redirect } from "react-router-dom"
import CategoryChild from "./CategoryChild"
export default class Category extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categoryList: []
        }
    }
    componentDidMount() {
        this.$axios("/api/getcate").then((res) => {
            if (res.data.code === 200) {
                this.setState({
                    categoryList: res.data.list
                })
            }
        })
    }
    render() {
        return (
            <main id="category">
                <header>
                    <h2>商品分类</h2>
                    <div className="search-wrapper-relative">
                        <input type="text" placeholder="按内容搜索" />
                        <div className="searchLogo"></div>
                        <button>搜索</button>
                    </div>
                </header>
                <article>
                    <div className="left-wrapper">
                        <ul>
                            {
                                this.state.categoryList.map((item,_index)=>{
                                    return(
                                        <li key={item.id}>
                                            <NavLink to={{pathname:"/category/"+item.id}}>{item.catename}</NavLink>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <Switch>
                        <Route path="/category/:id" component={CategoryChild}></Route>
                        <Redirect from="/category" to="/category/1"></Redirect>
                    </Switch>
                </article>
            </main>
        )
    }
}