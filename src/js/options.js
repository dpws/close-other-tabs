import './core/shared'
import '../assets/scss/style.scss';
import {getOptions, setOptions} from "./core/utils";

window.addEventListener('load', () => {
    console.log('options loaded');
    getOptions()
        .then(options => {
            if(options.askConfirmation) {
                document.getElementById('askConfirmation').click();
            }
        });

    document.getElementById('askConfirmation').addEventListener('change', saveOptions);
});

function saveOptions() {
    const askConfirmation = document.getElementById('askConfirmation').checked;
    setOptions({
        askConfirmation
    });
}