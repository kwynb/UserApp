import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routing from '../routes/Routing';

class App extends Component {
    constructor(props) {
        super(props);
    }


    render(){
        return(
            <Router>
                <Routing/>
            </Router>
        );
    }
}

export default App;