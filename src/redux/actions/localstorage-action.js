export const ON_LOCAL_STORAGE_ACTION = "ON_LOCAL_STORAGE_ACTION";
export const onGetLocalStorage = (stored) => {
    return {
        type: ON_LOCAL_STORAGE_ACTION,
        payload: stored,
    }
}