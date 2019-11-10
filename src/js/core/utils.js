import {syncOptionsFromStorage, syncOptionsToStorage} from "./ChromeTools";

export const getOptions = () => {
    return syncOptionsFromStorage({
        askConfirmation: true
    });
};

export const setOptions = syncOptionsToStorage;