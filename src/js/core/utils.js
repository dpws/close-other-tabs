import ChromeTools from "./ChromeTools";

export const getOptions = () => {
    return ChromeTools.syncOptionsFromStorage({
        askConfirmation: true
    });
};

export const setOptions = ChromeTools.syncOptionsToStorage;