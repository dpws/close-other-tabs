window.onload = function () {
    chrome.browserAction.onClicked.addListener(function (tab) {
        chrome.windows.getAll({populate: true}, function (windows) {
            windows.forEach(function (window) {
                if(!window.focused) return;
                if (window.tabs.length > 1 && confirm(chrome.i18n.getMessage('confirmation'))) {
                    window.tabs.forEach(function (tab) {
                        if (!tab.active && !tab.pinned) {
                            chrome.tabs.remove(tab.id);
                        }
                    });
                }
            });
        });
    });
};