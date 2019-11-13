import ChromeTools from "./core/ChromeTools";

import './core/shared';
import '../assets/scss/style.scss';
import {getOptions, setOptions} from "./core/utils";
import {closeOtherTabs} from "./core/shared";

window.addEventListener('load', async () => {
    let currentOptions = {};
    getOptions()
        .then(options => {
            currentOptions = options;
            if (!options.askConfirmation) {
                closeOtherTabs();
                parent.close();
            }
        });

    const tabs = await ChromeTools.getAllTabs();
    document.getElementById('tabs-count').textContent = tabs.length;
    document.getElementById('agree').addEventListener('click', () => {
        const continueAsk = document.getElementById('stopAsking').checked;
        if (continueAsk) {
            setOptions({
                ...currentOptions,
                askConfirmation: false
            })
        }
        closeOtherTabs();
        parent.close();
    });

    document.getElementById('decline').addEventListener('click', () => {
        parent.close();
    });
});