import React, {Component} from "react";
import PropTypes from 'prop-types';
import {getUserByUsername, register, update} from "../services/user-service";
import {bindActionCreators} from "redux";
import {onLogin} from "../redux/actions/login-action";
import {onGetUser, onGetUserByUsername, onUpdateUser} from "../redux/actions/user-action";
import {connect} from "react-redux";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname   : '',
            lastname    : '',
            birthday    : '',
            email       : '',
            username    : '',
            password    : '',
            maxDate     : '',
            onUpdate    : false,
            showPassword: false,
            success     : false,
            error       : false,
            registered  : false,
            edited      : false,
            loginUser   : localStorage.getItem("id"),
            user        : localStorage.getItem("user")
        };
    }



    componentDidMount() {
        const now = new Date();
        const max = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().substring(0,10);
        this.setState({
            maxDate: max
        })
        if (this.state.user) {
            getUserByUsername(this.state.user).then((res) => {
                this.props.onGetUserByUsername(res.data);
                const date = this.props.profile.birthDay.split("/").reverse();
                const birthday = date[0] + "-" + date[2] + "-" + date[1];
                this.setState({
                    firstname   : this.props.profile.firstName,
                    lastname    : this.props.profile.lastName,
                    birthday    : birthday,
                    email       : this.props.profile.email,
                    username    : this.props.profile.username,
                    password    : this.props.profile.password,
                    onUpdate    : true});
            }).catch((err) => {console.error(err.response);});
        }
    }

    handleFirstNameInput = (event) => {
        this.setState({
            firstname: event.target.value
        })
    }

    handleLastNameInput = (event) => {
        this.setState({
            lastname: event.target.value
        })
    }

    handleBirthDayInput = (event) =>{
        this.setState({
            birthday: event.target.value
        });
    }

    handleEmailInput = (event) => {
        this.setState({
            email: event.target.value
        })

    }

    handleUsernameInput = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handlePasswordInput = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }

    onEdit = (event) => {
        event.preventDefault();
        if (this.state.password === this.props.profile.password) {
            update(this.props.profile.id,
                this.state.firstname,
                this.state.lastname,
                this.state.birthday,
                this.state.email,
                this.state.username,
                this.state.password)
                .then(res => {
                    this.setState({
                        success : true,
                        edited  : true
                    })
                    this.props.onGetUser(res.data);})
                .catch(()=> this.setState({error: true}));
        }
    }

    onRegister = (event) => {
        event.preventDefault()
        this.setState({ onUpdate: false })
        register(this.state.firstname,
            this.state.lastname,
            this.state.birthday,
            this.state.email,
            this.state.username,
            this.state.password)
            .then(() => this.setState({
                success     : true,
                registered  : true
            }))
            .catch(()=> this.setState({error: true}));

    }

    onCancelEdit = () => {
        this.props.history.push("/profile");
    }

    onCancelRegister = () => {
        this.props.history.push("/login");
    }

    handleClose = () => {
        this.setState({
            success     : false,
            registered  : false,
            edited      : false
        })
        if (this.state.onUpdate === true) {
            this.props.history.push("/profile")
        }
        if (this.state.onUpdate === false) {
            this.props.history.push("/")
        }
    }
    render() {
        return (
            <div className="rcover">
                <h3 className="statement">QuickLOG</h3>
                {this.state.success && <div className="modal-backdrop">
                    <div className="modal-main dialog">
                        {this.state.registered && <div><h3 className="fw-bolder">User Added Successfully!</h3><hr/></div>}
                        {this.state.edited && <div><h3 className="fw-bolder">Edit Successful!</h3><hr/></div>}
                        <div className="float-end">
                            <button type="button" className="btn" onClick={this.handleClose}>Ok</button>
                        </div><br/><br/>
                    </div>
                </div>}
                {this.state.error && <div className="modal-backdrop">
                    <div className="modal-main dialog">
                        <h3 className="fw-bolder">ERROR: Invalid User.</h3><hr/>
                        <div>Try again.</div>
                        <div className="float-end">
                            <button type="button" className="btn" onClick={this.handleClose}>Ok</button>
                        </div><br/><br/>
                    </div>
                </div>}
                <button type="button" className="btn w-25 d-inline float-end" onClick={this.state.onUpdate? this.onCancelEdit : this.onCancelRegister}>Cancel</button>
                {this.state.onUpdate ? <form onSubmit={this.onEdit} className="myForm mb-3">
                    <div className="row">
                        <div className="form-group mb-3 col-md-6">
                            <label htmlFor="firstname" className="col-md-5">First Name: </label>
                            <input
                                type="text"
                                id="firstname"
                                placeholder="Your first name"
                                className="form-control d-inline fw-bolder"
                                value={this.state.firstname || ""}
                                onChange={this.handleFirstNameInput}
                                required
                            /><br/>
                        </div>
                        <div className="form-group mb-3 col-md-6">
                            <label htmlFor="lastname">Last Name: </label>
                            <input
                                type="text"
                                id="lastname"
                                placeholder="Your last name"
                                className="form-control d-inline fw-bolder"
                                value={this.state.lastname || ""}
                                onChange={this.handleLastNameInput}
                                required
                            /><br/>
                        </div>
                        <div className="form-group mb-3 col-md-6">
                            <label htmlFor="birthday">Birthday: </label>
                            <input
                                type="date"
                                id="birthday"
                                min="1960-01-01"
                                max={this.state.maxDate}
                                className="form-control d-inline fw-bolder"
                                value={this.state.birthday  || ""}
                                onChange={this.handleBirthDayInput}
                                required
                            />
                            <br/>
                        </div>
                        <div className="form-group mb-3 col-md-6">
                            <label htmlFor="username">Username: </label>
                            <input
                                type="username"
                                id="username"
                                placeholder="Your username"
                                className="form-control d-inline fw-bolder"
                                value={this.state.username  || ""}
                                onChange={this.handleUsernameInput}
                                required
                            /><br/>
                        </div>
                        <div className="form-group mb-3 col-md-6">
                            <label htmlFor="email">Email: </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Your email"
                                className="form-control d-inline fw-bolder"
                                value={this.state.email  || ""}
                                onChange={this.handleEmailInput}
                                required
                            /><br/>
                        </div>
                        <div className="form-group mb-3 col-md-6">
                            <label htmlFor="password">Confirm Password: </label>
                            <input
                                type={this.state.showPassword ? "text": "password"}
                                id="password"
                                placeholder="Your password"
                                className="form-control d-inline fw-bolder"
                                onChange={this.handlePasswordInput}
                                required
                            /><br/>
                            <div className="form-check mb-2">
                                <input type="checkbox" className="form-check-input cursor" id="exampleCheck1" onClick={this.handleShowPassword}/>
                                <label className="form-check-label" htmlFor="exampleCheck1">
                                    {this.state.showPassword ? <div className="password">Hide Password</div>
                                        : <div className="password">Show Password</div>}</label>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn w-100">Save</button>
                </form>
                :<form onSubmit={this.onRegister} className="myForm mb-3">
                    <div className="row">
                    <div className="form-group mb-3 col-md-6">
                        <label htmlFor="firstname" className="col-md-5">First Name: </label>
                        <input
                            type="text"
                            id="firstname"
                            placeholder="Your first name"
                            className="form-control d-inline fw-bolder"
                            onChange={this.handleFirstNameInput}
                            required
                        /><br/>
                    </div>
                    <div className="form-group mb-3 col-md-6">
                        <label htmlFor="lastname">Last Name: </label>
                        <input
                            type="text"
                            id="lastname"
                            placeholder="Your last name"
                            className="form-control d-inline fw-bolder"
                            onChange={this.handleLastNameInput}
                            required
                        /><br/>
                    </div>
                    <div className="form-group mb-3 col-md-6">
                        <label htmlFor="birthday">Birthday: </label>
                        <input
                            type="date"
                            id="birthday"
                            placeholder="Your birthday"
                            min="1960-01-01"
                            max={this.state.maxDate}
                            className="form-control d-inline fw-bolder"
                            value={this.state.birthday || ""}
                            onChange={this.handleBirthDayInput}
                            required
                        />
                        <br/>
                    </div>
                    <div className="form-group mb-3 col-md-6">
                        <label htmlFor="username">Username: </label>
                        <input
                            type="username"
                            id="username"
                            placeholder="Your username"
                            className="form-control d-inline fw-bolder"
                            onChange={this.handleUsernameInput}
                            required
                        /><br/>
                    </div>
                    <div className="form-group mb-3 col-md-6">
                        <label htmlFor="email">Email: </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Your email"
                            className="form-control d-inline fw-bolder"
                            onChange={this.handleEmailInput}
                            required
                        /><br/>
                    </div>
                    <div className="form-group mb-3 col-md-6">
                        <label htmlFor="password">Password: </label>
                        <input
                            id="password"
                            type={this.state.showPassword ? "text": "password"}
                            className="form-control d-inline fw-bolder"
                            onChange={this.handlePasswordInput}
                            required
                        /><br/>
                        <div className="form-check mb-2">
                            <input type="checkbox" className="form-check-input cursor" id="exampleCheck1" onClick={this.handleShowPassword}/>
                            <label className="form-check-label" htmlFor="exampleCheck1">
                                {this.state.showPassword ? <div className="password">Hide Password</div>
                                    : <div className="password">Show Password</div>}</label>
                        </div>
                    </div>
                    </div>
                    <button type="submit" className="btn w-100">Register</button>
                </form>}
            </div>
    );
    }
    }

Register.propTypes = {
    firstname   : PropTypes.string,
    lastname    : PropTypes.string,
    birthday    : PropTypes.instanceOf(Date),
    email       : PropTypes.string,
    username    : PropTypes.string,
    password    : PropTypes.string,
}

const mapStateToProps = (state) => {
    return {
        login   : state.login.user,
        profile : state.users.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        onGetUserByUsername,
        onGetUser,
        onUpdateUser,
        onLogin
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
