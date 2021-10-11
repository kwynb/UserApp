import {
    ON_GET_USERLIST_ACTION,
    ON_GET_USER_ACTION,
    ON_GET_USER_BY_USERNAME_ACTION,
    ON_UPDATE_USER_ACTION,
} from "../../utils/on-actions";


const getDefaultState = () => ({ users: [], user: {}, mailUser:{}});

export const users = (state = getDefaultState(), action) => {

    const {type, payload} = action;

    switch (type) {
        case ON_GET_USERLIST_ACTION: {
            return Object.assign({}, state, {users: payload});
        }
        case ON_GET_USER_ACTION: {
            return Object.assign({}, state, {user: payload});
        }
        case ON_GET_USER_BY_USERNAME_ACTION: {
            return Object.assign({}, state, {user: payload});
        }
        case ON_UPDATE_USER_ACTION: {
            return Object.assign({}, state, {user: payload});
        }
        default: {
            return state;
        }
    }
}

