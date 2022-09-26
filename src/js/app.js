import turnWebp from "./modules/functions.js"
import spoilersInit from "./modules/spoiler.js"
import dynamicAdaptiveInit from "./modules/dynamic-adaptive.js"
import userScripts from "./modules/scripts.js"
import startSlideout from "./modules/slideout-menu.js"


function ibg() {
    let ibg = document.querySelectorAll(".ibg");

    for (var i = 0; i < ibg.length; i++) {
        if (ibg[i].querySelector('img')) {
            ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('img').getAttribute('src')+')';
        }
    }
}

function onDocumentLoaded() {
    document.querySelector('body').classList.remove('_preload');

    turnWebp();
    ibg();
    spoilersInit();
    dynamicAdaptiveInit();
    userScripts();
    startSlideout();
}

window.onload = onDocumentLoaded;
