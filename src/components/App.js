import React, { Component } from "react";
import {BrowserRouter as Router } from "react-router-dom";
import Routing from "../routes/Routing";
import Navbar from "../layouts/Navbar";

class App extends Component {

    render(){
        return(
            <div>
                <Navbar/>
                <Router>
                    <Routing/>
                </Router>
            </div>
        );
    }
}


export default App;
