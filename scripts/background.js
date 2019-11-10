window.onload = function () {
    guessAvailability();
    chrome.tabs.onCreated.addListener(guessAvailability);
    chrome.tabs.onActiveChanged.addListener(guessAvailability);
    chrome.tabs.onDetached.addListener(guessAvailability);
    chrome.tabs.onAttached.addListener(guessAvailability);
    chrome.tabs.onRemoved.addListener(guessAvailability);
};

function guessAvailability() {
    getCloseableTabsCount()
        .then(count => {
            if(count > 0) {
                chrome.browserAction.setIcon({path:"icons/active.png"});
                chrome.browserAction.setPopup({popup: 'popups/confirmation.html'});
            } else {
                chrome.browserAction.setIcon({path:"icons/inactive.png"});
                chrome.browserAction.setPopup({popup: 'popups/no-closeable-tabs.html'});
            }
        })
        .catch( err => {
            console.error(err);
            chrome.browserAction.setIcon({path:"icons/inactive.png"});
            chrome.browserAction.setPopup({popup: 'popups/no-closeable-tabs.html'});
        })

}