import React, {Component} from "react";
import {connect} from "react-redux";
import {deleteUser, getUserByUsername, update} from "../services/user-service";
import {bindActionCreators} from "redux";
import {onGetUser, onGetUserByUsername, onGetUsers} from "../redux/actions/user-action";
import {FaUserCircle} from "react-icons/fa";
import {RiDeleteBinLine} from "react-icons/ri";
import {CgKeyhole} from "react-icons/cg";
import {MdModeEdit} from "react-icons/md";
import Deactivation from "../layouts/modals/Deactivation";
import PasswordChange from "../layouts/modals/PasswordChange";
import "../styles/Profile.css";
import "../styles/Modal.css";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changePass: false,
            showPassword: false,
            deactivate: false,
            newPassword: '',
            confirmPass: '',
            oldPassword: ''
        }
    }
    componentDidMount() {
        getUserByUsername(this.props.user.username).then((res) => {
            this.props.onGetUserByUsername(res.data);
        }).catch((err) => console.error(err.response));
    }
    componentDidUpdate(prevProps, prevState,SS) {
        if (prevProps.profile !== this.props.profile) {
            getUserByUsername(this.props.user.username).then((res) => {
                this.props.onGetUserByUsername(res.data);
            }).catch((err) => console.error(err.response));
        }
    }
    handleProfile = () => {
        this.props.history.push("/profile");
    }

    handleMail = () => {
        this.props.history.push("/mail");
    }

    handleEdit = () => {
        this.props.history.push("/edit");
    }

    onPasswordChange = () => {
        this.setState({
            changePass: true });
    }

    onDeactivation = () => {
        this.setState({
            deactivate: true });
    }

    handleDelete = () => {
        deleteUser(this.props.profile.id)
            .then((res) => {
                    console.log(res);
                    this.setState({deactivate: false});
                    this.props.history.push("/login");
                }
            )
            .catch(err => console.error(err.response));
    }

    handleNewPassword = (event) => {
        this.setState({
            newPassword: event.target.value
        })
    }

    handleConfirmPassword = (event) => {
        this.setState({
            confirmPass: event.target.value
        })
    }

    handleOldPassword = (event) => {
        this.setState({
            oldPassword: event.target.value
        })
    }


    handleShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }

    handleChangePass = () => {
        const date = this.props.profile.birthDay.split("/").reverse();
        const birthday = date[0] + "-" + date[2] + "-" + date[1];
        if (this.state.oldPassword === this.props.profile.password &&
            this.state.newPassword === this.state.confirmPass) {
            update(this.props.profile.id,
                this.props.profile.firstName,
                this.props.profile.lastName,
                birthday,
                this.props.profile.email,
                this.props.profile.username,
                this.state.newPassword)
                .then((res) => {
                        console.log(res.data);
                        this.setState({ changePass: false});
                    }
                )
                .then(this.props.history.push("/login"))
                .catch(err => console.error(err.response));
        }
    }

    hideModal = () => {
        this.setState({
            changePass: false,
            deactivate: false
        })
    }


    render(){
        return(
            <div className="set">
                {this.props.loggedIn ?
                    <div className="m-0 container">
                        {this.state.changePass && <PasswordChange showPassword={this.state.showPassword} handleChange={this.handleChangePass}
                          handleShowPassword={this.handleShowPassword} handleOld={this.handleOldPassword} handleNew={this.handleNewPassword} handleConfirm={this.handleConfirmPassword} handleClose={this.hideModal}/>}
                        {this.state.deactivate && <Deactivation handleClose={this.hideModal} handleDelete={this.handleDelete}/>}
                        <h3 className="btn name" onClick={this.handleProfile}>{'@' + this.props.profile.username}</h3>
                        <h3 className="btn direct-mail d-inline-block mb-2 ms-2" onClick={this.handleMail}>Mail</h3>
                        <hr className="mt-0"/><br/>
                        <div className="card mb-3">
                            <div className="card-body">
                                <div className="row mt-3">
                                    <div className="me-5 col-md-3 mt-3 profile">
                                        <FaUserCircle size="10rem" className="image d-inline mt-md-4"/>
                                    </div>
                                    <div className="col-md-7 mb-4">
                                        <div className="row">
                                            <div className="mb-2">
                                                <button className="btn float-end me-1"
                                                        onClick={this.onDeactivation}><RiDeleteBinLine size="1.3em"/>
                                                </button>
                                                <button className="btn float-end me-1"
                                                        onClick={this.onPasswordChange}><CgKeyhole size="1.4rem"/>
                                                </button>
                                                <button className="btn float-end me-1"
                                                        onClick={this.handleEdit}><MdModeEdit size="1.3rem"/> Edit
                                                </button>
                                            </div>
                                            <div className="col-sm-4">
                                                <h6 className="mb-0 fw-bolder">Name</h6>
                                            </div>
                                            <div className="col-sm-8 text-secondary">
                                                {this.props.profile.firstName + ' ' + this.props.profile.lastName}
                                            </div>
                                        </div>
                                        <hr className="mt-0"/>
                                        <div className="row mt-4">
                                            <div className="col-sm-4">
                                                <h6 className="mb-0 fw-bolder">Email</h6>
                                            </div>
                                            <div className="col-sm-8 text-secondary">
                                                {this.props.profile.email}
                                            </div>
                                        </div>
                                        <hr className="mt-0"/>
                                        <div className="row mt-4">
                                            <div className="col-sm-4">
                                                <h6 className="mb-0 fw-bolder">Username</h6>
                                            </div>
                                            <div className="col-sm-8 text-secondary">
                                                {this.props.profile.username}
                                            </div>
                                        </div>
                                        <hr className="mt-0"/>
                                        <div className="mt-4 row">
                                            <div className="col-sm-4">
                                                <h6 className="mb-0 fw-bolder">Birthday</h6>
                                            </div>
                                            <div className="col-sm-8 text-secondary">
                                                {this.props.profile.birthDay}
                                            </div>
                                        </div>
                                        <hr className="mt-0"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> : <div>{this.props.history.push("/login")}</div>}
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.login.user,
        loggedIn: state.login.user.loggedIn,
        users: state.users.users,
        profile: state.users.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        onGetUsers,
        onGetUser,
        onGetUserByUsername
    }, dispatch);
};

export default connect(mapStateToProps,mapDispatchToProps) (Profile);