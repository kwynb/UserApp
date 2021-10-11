import {
    ON_GET_USERLIST_ACTION,
    ON_GET_USER_ACTION,
    ON_GET_USER_BY_USERNAME_ACTION,
    ON_UPDATE_USER_ACTION,
} from "../../utils/on-actions";

export const onGetUsers = (users) => {
    return {
        type    : ON_GET_USERLIST_ACTION,
        payload : users,
    }
}

export const onGetUser = (user) => {
    return {
        type    : ON_GET_USER_ACTION,
        payload : user,
    }
}

export const onGetUserByUsername = (user) => {
    return {
        type: ON_GET_USER_BY_USERNAME_ACTION,
        payload: user,
    }
}

export const onUpdateUser = (user) => {
    return {
        type: ON_UPDATE_USER_ACTION,
        payload: user,
    }
}