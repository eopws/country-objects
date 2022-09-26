import "../libs/slideout.min.js"

export default function startSlideout() {
    const panel = document.querySelector('.page');
    const menu = document.querySelector('.page-menu');

    const slideout = new Slideout({
        'panel': panel,
        'menu': menu,
        'padding': 256,
        'tolerance': 70,
        'side': 'right',
    });

    document.querySelector('.burger-btn').addEventListener('click', () => slideout.toggle());
    document.querySelector('.page-menu__close-btn').addEventListener('click', () => slideout.close());

    slideout.on('beforeopen', () => {
        document.querySelector('.page-blackout').classList.add('page-blackout--visible')
        document.querySelector('.page-menu').classList.add('slideout-open');
    });

    slideout.on('close', () => {
        document.querySelector('.page-blackout').classList.remove('page-blackout--visible')
        document.querySelector('.page-menu').classList.remove('slideout-open');
    });
}
