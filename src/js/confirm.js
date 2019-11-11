import {closeTab, getAllTabs} from "./core/ChromeTools";

import './core/shared';
import '../assets/scss/style.scss';
import {getOptions, setOptions} from "./core/utils";

window.addEventListener('load', async () => {
    const tabs = await getAllTabs();
    let currentOptions = {};
    getOptions()
        .then(options => {
            currentOptions = options;
            if(!options.askConfirmation) {
                for(let tab of tabs) {
                    closeTab(tab);
                }
                parent.close();
            }
        });
    document.getElementById('tabs-count').textContent = tabs.length;
    document.getElementById('agree').addEventListener('click', () => {
        const continueAsk = document.getElementById('stopAsking').checked;
        if(continueAsk) {
            setOptions({
                ...currentOptions,
                askConfirmation: false
            })
        }
        for(let tab of tabs) {
            closeTab(tab);
        }
        parent.close();
    });

    document.getElementById('decline').addEventListener('click', () => {
        parent.close();
    });
});