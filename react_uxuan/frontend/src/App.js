import './css/App.css';
import { Route, Redirect, Switch, withRouter,NavLink} from "react-router-dom"
import Login from "./components/Login"
import Homepage from "./components/Homepage"
import Category from "./components/Category"
import ShopCart from "./components/ShopCart"
import Person from "./components/Person"
import NotFound from "./components/NotFound"
import Interceptor from "./components/Interceptor"
function App() {
    return (
        <div className = "App" >
            <Switch>
                <Route path="/login" component={Login}></Route>
                <Route path="/homepage" component={Homepage}></Route>
                <Route path="/category" component={Category}></Route>
                <Interceptor path="/shopcart" component={ShopCart}></Interceptor>
                <Route path="/person" component={Person}></Route>
                <Redirect from="/" to="/homepage" exact></Redirect>
                <Route component={NotFound}></Route>
            </Switch>
            <footer>
                <NavLink to="/homepage" className="menu"><i></i></NavLink>
                <NavLink to="/category" className="menu"><i></i></NavLink>
                <NavLink to="/shopcart" className="menu"><i></i></NavLink>
                <NavLink to="/person" className="menu"><i></i></NavLink>
            </footer>
        </div>
    );
}

export default withRouter(App);