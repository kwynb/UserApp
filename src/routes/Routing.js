import React, { Component } from "react";
import {Switch, Route, useHistory} from "react-router-dom";

import Login from "../components/Login";
import Welcome from "../components/Welcome";
import Register from "../components/Register";

class Routing extends Component {
    render() {
        return (
            <Switch>
                <Route path={["/", "/login"]} exact component={Login}/>
                <Route path="/register" exact component={Register}/>
                <Route path="/welcome" exact component={Welcome}/>
             </Switch>
        );
    }
}


export default Routing;