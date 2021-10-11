import {ON_LOCAL_STORAGE_ACTION} from "../../utils/on-actions";

export const onGetLocalStorage = (stored) => {
    return {
        type    : ON_LOCAL_STORAGE_ACTION,
        payload : stored,
    }
}