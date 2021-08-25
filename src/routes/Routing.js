import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Login from "../components/Login";
import Welcome from "../components/Welcome";
import Register from "../components/Register";


class Routing extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path={["/", "/login"]} exact>
                        <Login />
                    </Route>
                    <Route path="/register" exact component={Register}/>
                    <Route path="/welcome" exact component={Welcome}/>
                 </Switch>
            </div>
        );
    }
}


export default Routing;