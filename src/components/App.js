import React, { Component } from "react";
import {BrowserRouter as Router } from "react-router-dom";
import Routing from "../routes/Routing";
import Navbar from "../layouts/Navbar";
import {connect} from "react-redux";

class App extends Component {

    render(){
        return(
            <div>
                <Navbar stored={this.props.stored}/>
                <Router>
                    <Routing/>
                </Router>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        stored: state.local.stored
    };
};

export default connect(mapStateToProps,null) (App);
