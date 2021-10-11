import {ON_GET_USER_BY_EMAIL_ACTION} from "../../utils/on-actions";

export const onGetUserByEmail = (mailUser) => {
    return {
        type    : ON_GET_USER_BY_EMAIL_ACTION,
        payload : mailUser,
    }
}

