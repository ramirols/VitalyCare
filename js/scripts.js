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

/* Carga de componentes */
document.addEventListener("DOMContentLoaded", function () {
    const isAuthPage = window.location.pathname.includes("login") || window.location.pathname.includes("registro");

    if (!isAuthPage) {
        Promise.all([
            loadComponent("../layout/header.html", "header"),
            loadComponent("../layout/footer.html", "footer"),
            loadComponent("../components/slider.html", "slider"),
            loadComponent("../components/carousel.html", "carousel"),
            loadComponent("../components/contact-template.html", "contact-template"),
            loadComponent("../components/servicios-carousel.html", "servicios-carousel")
        ]).then(() => {
            initSwiper();
            initCarousel();
        }).catch(error => {
            console.error("Error al cargar los componentes:", error);
        });
    }
});

async function loadComponent(file, elementId) {
    try {
        const response = await fetch(file);
        const data = await response.text();
        document.getElementById(elementId).innerHTML = data;
    } catch (error) {
        console.error("Error al cargar el componente:", error);
    }
}

/* Validaciones de formulario de login y registro */
document.addEventListener("DOMContentLoaded", function () {

    if (document.querySelector("#vitalycare-login-form")) {
        const loginValidator = new JustValidate("#vitalycare-login-form");

        loginValidator
            .addField(".vitalycare-login-username", [
                { rule: "required", errorMessage: "El usuario es obligatorio" },
            ])
            .addField(".vitalycare-login-password", [
                { rule: "required", errorMessage: "La contraseña es obligatoria" },
                { rule: "minLength", value: 6, errorMessage: "Debe tener al menos 6 caracteres" },
            ])
            .onSuccess((event) => {
                event.preventDefault();
                console.log("Login válido, enviando datos...");
                Swal.fire({
                    icon: 'success',
                    title: 'Login Exitoso',
                    text: '¡Bienvenido a VitalyCare!',
                    showConfirmButton: true,
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#19C887',
                    allowOutsideClick: false,
                }).then(() => {
                    window.location.href = "../pages/index.html";
                })
            });
    }

    if (document.querySelector("#vitalycare-registro-form")) {
        const registroValidator = new JustValidate("#vitalycare-registro-form");

        registroValidator
            .addField(".vitalycare-registro-username", [
                { rule: "required", errorMessage: "El usuario es obligatorio" },
                { rule: "minLength", value: 3, errorMessage: "Debe tener al menos 3 caracteres" },
            ])
            .addField(".vitalycare-registro-email", [
                { rule: "required", errorMessage: "El correo es obligatorio" },
                { rule: "email", errorMessage: "Correo inválido" },
            ])
            .addField(".vitalycare-registro-password", [
                { rule: "required", errorMessage: "La contraseña es obligatoria" },
                { rule: "minLength", value: 6, errorMessage: "Debe tener al menos 6 caracteres" },
            ])
            .onSuccess((event) => {
                event.preventDefault();
                console.log("Registro válido, enviando datos...");
                Swal.fire({
                    icon: 'success',
                    title: 'Registro Exitoso',
                    text: '¡Bienvenido a VitalyCare!',
                    showConfirmButton: true,
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#19C887',
                    allowOutsideClick: false,
                }).then(() => {
                    window.location.href = "../pages/index.html";
                })
            });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        const footerDate = document.getElementById("vitalycare-footer-date");
        if (footerDate) {
            footerDate.textContent = new Date().getFullYear();
        }
    }, 1000);
});