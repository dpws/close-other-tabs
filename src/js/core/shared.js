import ChromeTools from "./ChromeTools";

window.addEventListener('load', async () => {

    for (const el of document.querySelectorAll('[data-i18n]')) {
        el.textContent = chrome.i18n.getMessage(el.getAttribute('data-i18n'));
    }
    const links = document.querySelector('[data-link]');
    if(links) {
        links.addEventListener('click', (e) => {
            chrome.tabs.create({url: e.target.getAttribute('data-link')});
        });
    }
});

export async function closeOtherTabs() {
    const tabs = await ChromeTools.getAllTabs();

    for (let tab of tabs) {
        ChromeTools.closeTab(tab);
    }

}
