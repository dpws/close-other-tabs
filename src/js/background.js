import ChromeTools from "./core/ChromeTools";
import {closeOtherTabs} from "./core/shared";

guessAvailability();

window.addEventListener('load', () => {
    guessAvailability();
    ChromeTools.onValuableTabAction(guessAvailability);
});

ChromeTools.onCommandReceived(command => {
    switch (command) {
        case 'close-other-tabs':
            closeOtherTabs(false);
            break;
    }
});

async function guessAvailability() {
    const tabs = await ChromeTools.getAllTabs();
    const count = tabs.length;
    console.log('Tabs: '+count);
    if (count > 0) {
        ChromeTools.setIcon({
            path: {
                "16": "icons/16.png",
                "32": "icons/32.png",
                "48": "icons/48.png",
                "128": "icons/128.png",
            }
        });
        ChromeTools.setPopup({popup: 'confirm.html'});
    } else {
        ChromeTools.setIcon({path: {
                "16": "icons/16_disabled.png",
                "32": "icons/32.png",
                "48": "icons/48.png",
                "128": "icons/128.png",
            }});
        ChromeTools.setPopup({popup: 'no-tabs.html'});
    }


}