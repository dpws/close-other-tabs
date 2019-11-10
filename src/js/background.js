import {getAllTabs} from "./core/ChromeTools";

window.addEventListener('load', () => {
    guessAvailability();
    chrome.tabs.onCreated.addListener(guessAvailability);
    chrome.tabs.onActiveChanged.addListener(guessAvailability);
    chrome.tabs.onDetached.addListener(guessAvailability);
    chrome.tabs.onAttached.addListener(guessAvailability);
    chrome.tabs.onRemoved.addListener(guessAvailability);
});

async function guessAvailability() {
    const tabs = await getAllTabs();
    const count = tabs.length;
    console.log('Tabs', count);
    if (count > 0) {
        chrome.browserAction.setIcon({
            path: {
                "16": "icons/16.png",
                "32": "icons/32.png",
                "48": "icons/48.png",
                "128": "icons/128.png",
            }
        });
        chrome.browserAction.setPopup({popup: 'confirm.html'});
    } else {
        chrome.browserAction.setIcon({path: {
                "16": "icons/16_disabled.png",
                "32": "icons/32.png",
                "48": "icons/48.png",
                "128": "icons/128.png",
            }});
        chrome.browserAction.setPopup({popup: 'no-tabs.html'});
    }


}