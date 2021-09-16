import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {onGetUserByEmail} from "../../redux/actions/mailuser-action";
import {onGetEmail} from "../../redux/actions/email-action";
import {connect} from "react-redux";
import "../../styles/MailUserProfile.css";

class MailUserProfile extends Component {
    render() {
        return (
            <div className={"user-backdrop"}>
                <div className="user-profile">
                    <div className="top mb-2">Mail</div>
                    <div className="user-detail">
                        <h3 className="fw-bolder">Profile</h3>
                        <hr className="mt-0"/>
                        <div className="user-info">
                            <div className="row">
                                <h6 className="col-md-3 fw-bolder text-secondary">Name</h6>
                                <div className="col-sm-auto ms-md-2">{this.props.mailUser.firstName + " " + this.props.mailUser.lastName}</div>
                            </div>
                            <div className="row">
                                <h6 className="col-sm-3 fw-bolder text-secondary mt-0"/>
                                <div className="col-sm-auto ms-md-2 small text-muted mt-0">{this.props.mailUser.username}</div>
                            </div><br/>
                            <div className="row">
                                <h6 className="col-sm-3 fw-bolder text-secondary">Email</h6>
                                <div className="col-md-auto ms-md-2">{"<" + this.props.mailUser.email + ">"}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        mailUser: state.mailUsers.mailUser,
        mail: state.emails.email
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        onGetUserByEmail,
        onGetEmail,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MailUserProfile);