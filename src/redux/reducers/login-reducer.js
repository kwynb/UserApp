import {ON_LOGIN_ACTION} from "../actions/login-action";


const getDefaultState = () => ({});

export const login = (state = getDefaultState(), action) => {

    const {type, payload} = action;

    switch (type) {
        case ON_LOGIN_ACTION: {
            return Object.assign({}, state, {user: payload});
        }
        default: {
            return state;
        }
    }
}