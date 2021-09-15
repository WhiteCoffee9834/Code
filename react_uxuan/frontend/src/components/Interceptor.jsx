import React, { Component } from 'react'
import { Route, Redirect } from "react-router-dom"
export default class Interceptor extends Component {
    render() {
        let { path, component: Com } = this.props
        return (
            <Route path={path} render={props => {
                return sessionStorage.getItem("user") ?
                    <Com {...props}></Com> :
                    <Redirect to={{ pathname: "/login", search: "?path=" + path }}></Redirect>
            }}>
            </Route>
        )
    }
}