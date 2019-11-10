window.addEventListener('load', () => {
    translateHtml();

    document.getElementById('github-link').addEventListener('click', () => {
        chrome.tabs.create({url : 'https://github.com/dpws/close-other-tabs'});
    })
});