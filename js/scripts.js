/* Slider */
function initSwiper() {
    if (document.querySelector(".mySwiper")) {
        new Swiper(".mySwiper", {
            loop: true,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            autoplay: {
                delay: 4000,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            on: {
                slideChangeTransitionStart: function () {
                    let activeSlide = document.querySelector(".swiper-slide-active .content");
                    if (activeSlide) {
                        activeSlide.style.opacity = "0";
                        activeSlide.style.transform = "translateY(50px)";
                    }
                },
                slideChangeTransitionEnd: function () {
                    let activeSlide = document.querySelector(".swiper-slide-active .content");
                    if (activeSlide) {
                        activeSlide.style.opacity = "1";
                        activeSlide.style.transform = "translateY(0)";
                    }
                },
            },
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }
}

/* Carousel */
function initCarousel() {
    if (document.querySelector(".vitalycare-carousel")) {
        $(".vitalycare-carousel").slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: {
                delay: 4000
            },
            autoplaySpeed: 3000,
            infinite: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }
}

/* Cargar componentes */
document.addEventListener("DOMContentLoaded", function () {
    Promise.all([
        loadComponent("../layout/header.html", "header"),
        loadComponent("../layout/footer.html", "footer"),
        loadComponent("../components/slider.html", "slider"),
        loadComponent("../components/carousel.html", "carousel"),
        loadComponent("../components/contact-template.html", "contact-template"),
        loadComponent("../components/servicios-carousel.html","servicios-carousel")
    ]).then(() => {
        initSwiper();
        initCarousel();
    }).catch(error => {
        console.error("Error al cargar los componentes:", error);
    });
});

function loadComponent(file, elementId) {
    return fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => {
            console.error("Error al cargar el componente:", error);
        });
}