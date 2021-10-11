import {
    ON_LOGIN_ACTION,
    ON_LOGOUT_ACTION
} from "../../utils/on-actions";

export const onLogin = (loginDetails) => {
    return {
        type    : ON_LOGIN_ACTION,
        payload : loginDetails,
    }
}

export const onLogout = (loginDetails) => {
    return {
        type    : ON_LOGOUT_ACTION,
        payload : loginDetails,
    }
}