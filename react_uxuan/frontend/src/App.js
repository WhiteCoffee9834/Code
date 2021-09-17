import './css/App.css';
import { Route, Redirect, Switch, withRouter,NavLink} from "react-router-dom"
import Login from "./components/Login"
import Homepage from "./components/Homepage"
import Category from "./components/Category"
import ShopCart from "./components/ShopCart"
import Person from "./components/Person"
import NotFound from "./components/NotFound"
import Detail from './components/Detail';
import Interceptor from "./components/Interceptor"
import React, { Component } from 'react'
class App extends Component {
    state={
        flag:true
    }
    componentDidMount(){
        this.checkVisible(this.props.location.pathname)
        this.props.history.listen(location=>{
            this.checkVisible(location.pathname)
        })
    }
    // 底部导航是否显示?
    checkVisible(name){
        let flag = true
        name.includes("detail") ? flag = false : flag = true
        this.setState({
            flag
        })
    }

    render() {
        return (
            <div className = "App" >
            <Switch>
                <Route path="/login" component={Login}></Route>
                <Route path="/homepage" component={Homepage}></Route>
                <Route path="/category" component={Category}></Route>
                <Route path="/detail/:id" component={Detail}></Route>
                <Interceptor path="/shopcart" component={ShopCart}></Interceptor>
                <Route path="/person" component={Person}></Route>
                <Redirect from="/" to="/homepage" exact></Redirect>
                <Route component={NotFound}></Route>
            </Switch>
            <footer style={{display: this.state.flag ? "flex" : "none"}}>
                <NavLink to="/homepage" className="menu"><i></i></NavLink>
                <NavLink to="/category" className="menu"><i></i></NavLink>
                <NavLink to="/shopcart" className="menu"><i></i></NavLink>
                <NavLink to="/person" className="menu"><i></i></NavLink>
            </footer>
        </div>
        )
    }
}

export default withRouter(App);