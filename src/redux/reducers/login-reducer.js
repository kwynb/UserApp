import {ON_LOGIN_ACTION, ON_LOGOUT_ACTION} from "../../utils/on-actions";

const getDefaultState = () => ({ user: {}, loggedIn: false });

export const login = (state = getDefaultState(), action) => {

    const {type, payload} = action;

    switch (type) {
        case ON_LOGIN_ACTION: {
            return Object.assign({}, state, {user: payload});
        }
        case ON_LOGOUT_ACTION: {
            return Object.assign({}, state, {user: payload});
        }
        default: {
            return state;
        }
    }
}