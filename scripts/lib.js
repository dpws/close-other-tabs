function close_other_tabs() {
    (new Promise(function (resolve, reject) {
        chrome.windows.getAll({populate: true}, function (windows) {
            let closed = 0;
            windows.forEach(function (window) {
                if (!window.focused) return;
                if (window.tabs.length > 1) {
                    window.tabs.forEach(function (tab) {
                        if (!tab.active && !tab.pinned) {
                            closed++;
                            chrome.tabs.remove(tab.id);
                        }
                    });
                }
            });
            resolve(closed);
        });
    }))
        .then(closedCount => {
            parent.close();
        });
}

function getCloseableTabsCount() {
    return new Promise(function (resolve, reject) {
        let count = 0;
        chrome.windows.getAll({populate: true}, function (windows) {
            windows.forEach(function (window) {
                if (!window.focused) return;
                if (window.tabs.length > 1) {
                    window.tabs.forEach(function (tab) {
                        if (!tab.active && !tab.pinned) {
                            count++;
                        }
                    });
                }
            });
            console.log('resolving', count);
            resolve(count);
        });
    });
}

function translateHtml() {
    const toTranslate = document.querySelectorAll('[data-i18n]');
    for (const el of toTranslate) {
        el.textContent = chrome.i18n.getMessage(el.getAttribute('data-i18n'));
    }
}