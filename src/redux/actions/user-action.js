export const ON_GET_USERLIST_ACTION = "ON_GET_USERLIST_ACTION";
export const onGetUsers = (users) => {
    return {
        type: ON_GET_USERLIST_ACTION,
        payload: users,
    }
}

export const ON_GET_USER_ACTION = "ON_GET_USER_ACTION";
export const onGetUser = (user) => {
    return {
        type: ON_GET_USER_ACTION,
        payload: user,
    }
}

export const ON_GET_USER_BY_USERNAME_ACTION = "ON_GET_USER_BY_USERNAME_ACTION";
export const onGetUserByUsername = (user) => {
    return {
        type: ON_GET_USER_BY_USERNAME_ACTION,
        payload: user,
    }
}

export const ON_GET_USER_BY_EMAIL_ACTION = "ON_GET_USER_BY_EMAIL_ACTION";
export const onGetUserByEmail = (mailUser) => {
    return {
        type: ON_GET_USER_BY_EMAIL_ACTION,
        payload: mailUser,
    }
}


export const ON_UPDATE_USER_ACTION = "ON_UPDATE_USER_ACTION";
export const onUpdateUser = (user) => {
    return {
        type: ON_UPDATE_USER_ACTION,
        payload: user,
    }
}