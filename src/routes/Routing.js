import React, { Component } from "react";
import {Switch, Route} from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import Profile from "../components/Profile";
import Email from "../components/Email";

class Routing extends Component {
    render() {
        return (
            <Switch>
                <Route path={["/", "/login"]} exact component={Login}/>
                <Route path={["/register", "/edit"]} exact component={Register}/>
                <Route path="/profile" exact component={Profile}/>
                <Route path="/mail" exact component={Email}/>
            </Switch>
        );
    }
}


export default Routing;