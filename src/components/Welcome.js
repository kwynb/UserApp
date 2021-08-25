import React, {Component} from "react";
import {connect} from "react-redux";
class Welcome extends Component {
    constructor(props) {
        super(props);

    }

    render(){
        return(
            <div>

                Welcome, {this.props.user.username}!

            </div>
        );
    }
}


const mapStateToProps = (state) => {
    console.log(state);
  return {
      user: state.login.user
  };
};
export default connect(mapStateToProps,null) (Welcome);