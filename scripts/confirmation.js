window.addEventListener('load', () => {
    console.log('loaded');
    getCloseableTabsCount()
        .then(count => {
            console.log('count', count);
            if(count === 0) {
                parent.close();
                return;
            }
            const agree = document.getElementById('agree');
            const decline = document.getElementById('decline');

            agree.addEventListener('click', close_other_tabs);
            decline.addEventListener('click', () => parent.close());
        })
        .catch(err => console.error(err))
});