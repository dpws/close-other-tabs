import {closeTab, getAllTabs} from "./core/ChromeTools";

import './core/shared';
import '../assets/scss/style.scss';
import {getOptions} from "./core/utils";

window.addEventListener('load', async () => {
    getOptions()
        .then(options => {
            if(!options.askConfirmation) {
                for(let tab of tabs) {
                    closeTab(tab);
                }
                parent.close();
            }
        });
    const tabs = await getAllTabs();
    document.getElementById('tabs-count').textContent = tabs.length;
    document.getElementById('agree').addEventListener('click', () => {
        for(let tab of tabs) {
            closeTab(tab);
        }
        parent.close();
    });

    document.getElementById('decline').addEventListener('click', () => {
        parent.close();
    });
});