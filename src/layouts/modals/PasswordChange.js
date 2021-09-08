import React, {Component} from 'react';
import "../../styles/Modal.css";

class PasswordChange extends Component {
    render() {
        return (
            <div className="modal-backdrop display-block">
                <div className="cover modal-main">
                    <h3 className="fw-bolder">Change password</h3><hr/>
                    <div className="row">
                        <label className="form-label col-md-5 mb-0"> New Password:</label>
                        <div className="col-md-7 text-secondary">
                            <input
                                type="password"
                                id="newpassword"
                                className="form-control d-inline"
                                onChange={this.props.handleNew}
                                required
                            /><br/>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <label className="form-label col-md-5 mb-0"> Confirm Password:</label>
                        <div className="col-md-7 text-secondary">
                            <input
                                type="password"
                                id="confirmpassword"
                                className="form-control d-inline"
                                onChange={this.props.handleConfirm}
                                required
                            /><br/>
                        </div>
                    </div>
                    <hr/>
                    <div className="row mt-2">
                        <label className="form-label col-md-5 mb-0"> Old Password:</label>
                        <div className="col-md-7 text-secondary">
                            <input
                                type="password"
                                id="oldpassword"
                                placeholder="Your password"
                                className="form-control d-inline fw-bolder"
                                onChange={this.props.handleOld}
                                required
                            /><br/>
                        </div>
                    </div>
                    <div className="float-end mt-3">
                        <button type="button" className="btn me-2" onClick={this.props.handleChange}>Confirm</button>
                        <button type="button" className="btn" onClick={this.props.handleClose}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default PasswordChange;