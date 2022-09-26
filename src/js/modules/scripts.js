import Swiper, {Navigation, Pagination} from 'swiper';


export default function userScripts() {
    const headerElement = document.querySelector('.main-header');

    const callback = (entries, observer) => {
        if (entries[0].isIntersecting) {
            headerElement.classList.remove('_scroll')
        } else {
            headerElement.classList.add('_scroll')
        }
    }

    const headerObserver = new IntersectionObserver(callback);

    headerObserver.observe(headerElement);

    // sliders
    Swiper.use([Navigation, Pagination]);

    const swiperOurProjects = new Swiper('.slider-our-projects__list', {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        parallax: true,
        navigation: false,
        breakpoints: {
            // when window width is >= 768px
            768: {
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                effect: 'cards',
                cardEffect: {
                    rotate: 0,
                    stretch: 80,
                    depth: 200,
                    modifier: 1,
                    slideShadows: false,
                },
                centeredSlides: true,
                slidesPerView: 3,
                spaceBetween: 0,
            }
        }
    });

    const swiperTestimonials = new Swiper('.testimonial__slider-container', {
        slidesPerView: 1,
        spaceBetween: 10,
        slidesPerGroup: 1,
        loop: false,

        pagination: {
            el: '.testimonial__slider-pagination',
            clickable: true,
            type: 'custom',
            renderCustom: function (swiper, current, total) {
                let toRender = '';
                let prevPages = '';

                let k = 0;

                for (let i = -2; i < 3; i++) {
                    if (i + current < 1) {
                        k = 2;
                    }

                    if (current === 2) {
                        k = 1;
                    }

                    if (i + current > total) {
                        prevPages = `<span data-page="${total - i - 2 - 1}" class="testimonial__slider-page">${total - i - 2}</span>, ` + prevPages;

                        continue;
                    }

                    if (i + k === 0)
                        toRender += `<span data-page="${i + current + k - 1}" class="testimonial__slider-page testimonial__slider-page--active">${i + current + k}</span>, `;
                    else
                        toRender += `<span data-page="${i + current + k - 1}" class="testimonial__slider-page">${i + current + k}</span>, `;
                }

                toRender = prevPages + toRender;
                toRender = toRender.slice(0, -2);

                if (total > current + 2) {
                    return toRender + `… <span data-page="${total - 1}" class="testimonial__slider-page">${total}</span>`;
                } else {
                    return `<span data-page="${0}" class="testimonial__slider-page">1</span>… ` + toRender;
                }
            },
        },

        breakpoints: {
            // when window width is >= 768px
            768: {
                slidesPerView: 'auto',
                spaceBetween: 126,
            }
        }
    });

    // click handler
    document.addEventListener('click', documentClickHandler);

    function documentClickHandler(e) {
        if (e.target.closest('.input-project-setting')) {
            const projectSetting = e.target.closest('.input-project-setting');

            const shownLists = document.querySelectorAll('.input-project-setting--list-shown');

            shownLists.forEach(list => list.classList.remove('input-project-setting--list-shown'));

            projectSetting.classList.toggle('input-project-setting--list-shown');

            const listToOpen = projectSetting.querySelector('.input-project-setting__list');

            listToOpen.style.bottom = -(listToOpen.getBoundingClientRect().height) - 1 + 'px';
        } else {
            const shownLists = document.querySelectorAll('.input-project-setting--list-shown');

            shownLists.forEach(list => list.classList.remove('input-project-setting--list-shown'));
        }

        if (e.target.closest('.testimonial__slider-pagination')) {
            if (!Number.isNaN(+e.target.dataset.page))
                swiperTestimonials.slideTo(e.target.dataset.page);
        }

        if (e.target.classList.contains('input-project-setting__item')) {
            const newValue = e.target.innerHTML;

            const projectSetting = e.target.closest('.input-project-setting');

            projectSetting.querySelector('.input-project-setting__value').classList.remove('input-project-setting__value--inactive');
            projectSetting.querySelector('.input-project-setting__value').innerHTML = newValue;

            projectSetting.classList.toggle('input-project-setting--list-shown');
        }
    }
}
