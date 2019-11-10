
window.addEventListener('load', async () => {

    for (const el of document.querySelectorAll('[data-i18n]')) {
        el.textContent = chrome.i18n.getMessage(el.getAttribute('data-i18n'));
    }

    document.querySelector('[data-link]').addEventListener('click', (e) => {
        chrome.tabs.create({url : e.target.getAttribute('data-link')});
    });
});

