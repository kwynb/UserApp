import {ON_GET_USER_BY_EMAIL_ACTION} from "../../utils/on-actions";

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