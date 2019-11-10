export const getAllTabs = () => {
    return new Promise((resolve, reject) => {
        chrome.windows.getCurrent({populate: true}, window => resolve(window.tabs.filter(tab => !tab.active && !tab.pinned)));
    });
};

export const closeTab = (tab) => {
    chrome.tabs.remove(tab.id);
};

export const syncOptionsToStorage = (options) => {
    chrome.storage.sync.set(options);
};

export const syncOptionsFromStorage = (defaultOptions) => {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(defaultOptions, (options) => resolve(options));
    });
};