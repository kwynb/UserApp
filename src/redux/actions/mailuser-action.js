export const ON_GET_USER_BY_EMAIL_ACTION = "ON_GET_USER_BY_EMAIL_ACTION";
export const onGetUserByEmail = (mailUser) => {
    return {
        type: ON_GET_USER_BY_EMAIL_ACTION,
        payload: mailUser,
    }
}

