import {ON_GET_USER_BY_EMAIL_ACTION} from "../actions/mailuser-action";

const getDefaultState = () => ({mailUser:{}});

export const mailUsers = (state = getDefaultState(), action) => {

    const {type, payload} = action;

    switch (type) {
        case ON_GET_USER_BY_EMAIL_ACTION: {
            return Object.assign({}, state, {mailUser: payload});
        }
        default: {
            return state;
        }
    }
}