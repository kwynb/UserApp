
export const ON_LOGIN_ACTION = "ON_LOGIN_ACTION";
export const onLogin = (loginDetails) => {
    return {
        type: ON_LOGIN_ACTION,
        payload: loginDetails,
    }
}

export const ON_LOGOUT_ACTION = "ON_LOGOUT_ACTION";
export const onLogout = (loginDetails) => {
    return {
        type: ON_LOGOUT_ACTION,
        payload: loginDetails,
    }
}