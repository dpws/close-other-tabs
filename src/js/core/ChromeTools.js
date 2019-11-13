
class ChromeTools {
    getAllTabs() {
        return new Promise((resolve, reject) => {
            chrome.windows.getCurrent({populate: true}, window => resolve(window.tabs.filter(tab => !tab.active && !tab.pinned)));
        });
    }

    closeTab(tab) {
        chrome.tabs.remove(tab.id);
    }

    syncOptionsToStorage(options) {
        chrome.storage.sync.set(options);
    }

    syncOptionsFromStorage(defaultOptions) {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get(defaultOptions, (options) => resolve(options));
        });
    }

    setIcon(icon) {
        chrome.browserAction.setIcon(icon);
    }

    setPopup(popup) {
        chrome.browserAction.setPopup(popup);
    }

    onCommandReceived(callback) {
        chrome.commands.onCommand.addListener(callback);
    }

    onValuableTabAction(callback) {
        chrome.tabs.onCreated.addListener(callback);
        chrome.tabs.onActiveChanged.addListener(callback);
        chrome.tabs.onDetached.addListener(callback);
        chrome.tabs.onAttached.addListener(callback);
        chrome.tabs.onRemoved.addListener(callback);
    }
}

export default new ChromeTools();