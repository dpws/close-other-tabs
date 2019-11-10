window.addEventListener('load', () => {
    console.log('loaded');
    getCloseableTabsCount()
        .then(count => {
            console.log('count', count);
            if(count === 0) {
                parent.close();
                return;
            }

            document.getElementById('count-container').textContent = count;
            document.getElementById('agree').addEventListener('click', close_other_tabs);
            document.getElementById('decline').addEventListener('click', () => parent.close());
        })
        .catch(err => console.error(err))
});