
export const ON_LOGIN_ACTION = "ON_LOGIN_ACTION";
export const onLogin = (loginDetails) => {
    return {
        type: ON_LOGIN_ACTION,
        payload: loginDetails,
    }
}