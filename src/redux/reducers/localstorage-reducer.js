import {ON_LOCAL_STORAGE_ACTION} from "../actions/localstorage-action";

const getDefaultState = () => ({ stored: null });

export const local = (state = getDefaultState(), action) => {

    const {type, payload} = action;

    switch (type) {
        case ON_LOCAL_STORAGE_ACTION: {
            return Object.assign({}, state, {stored: payload});
        }
        default: {
            return state;
        }
    }
}