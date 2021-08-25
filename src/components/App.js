import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routing from '../routes/Routing';

class App extends Component {
    constructor(props) {
        super(props);
    }


    render(){
        return(
            <div>
                <Router>
                    <Routing/>
                </Router>
            </div>
        );
    }
}

export default App;