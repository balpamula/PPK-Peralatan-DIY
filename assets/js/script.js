const menu = document.getElementById("menu");
const navbarMenu = document.querySelector(".navbar");

menu.onclick = function () {
    if (navbarMenu.style.display == "flex") {
        navbarMenu.style.display = "none";
    } else {
        navbarMenu.style.display = "flex";
    }
};

window.addEventListener("resize", function () {
    if (window.innerWidth > 870) {
        navbarMenu.style.display = "flex";
    } else {
        navbarMenu.style.display = "none";
    }
});

const menuBtn = document.getElementById("menuBtn");
const navbarButton = document.querySelector(".navbar-button");

menuBtn.onclick = function () {
    if (navbarButton.style.display == "flex") {
        navbarButton.style.display = "none";
    } else {
        navbarButton.style.display = "flex";
    }
};

window.addEventListener("resize", function () {
    if (window.innerWidth > 1080) {
        navbarButton.style.display = "flex";
    } else if (window.innerWidth <= 870) {
        navbarButton.style.display = "flex";
    } else {
        navbarButton.style.display = "none";
    }
});



$(document).ready(function () {
    var header = $("header");
    var button = $(".navbar-button .button");

    checkHeaderBackground();

    $(window).scroll(function () {
        checkHeaderBackground();
    });

    $(window).resize(function () {
        checkHeaderBackground();
    });

    function checkHeaderBackground() {
        if ($(window).scrollTop() > 0) {
            header.css({
                'background': '#01037C',
                'border-bottom': '2px solid #FFC632'
            });
            button.addClass('scrolled');
        } else {
            if ($(window).width() > 1080) {
                header.css({
                    'background': 'transparent',
                    'border-bottom': '2px solid #FFC632'
                });
                button.removeClass('scrolled');
            } else {
                header.css({
                    'background': '#01037C',
                    'border-bottom': '2px solid #FFC632'
                });
                button.addClass('scrolled');
            }
        }
    }
});

// $(document).ready(function () {
//     $(".owl-carousel").owlCarousel({
//         loop: true,
//         margin: 10,
//         nav: true,
//         dots: false,
//         responsiveClass: true,
//         autoplay: false,
//         autoplayTimeout: 3000,
//         autoplayHoverPause: true,
//         center: true,
//         navText: [
//             "<i class='fas fa-arrow-left'></i>",
//             "<i class='fas fa-arrow-right'></i>"
//         ],
//         responsive: {
//             0: {
//                 items: 1
//             },
//             425: {
//                 items: 1
//             },
//             768: {
//                 items: 1.82
//             },
//             870: {
//                 items: 1.82
//             },
//             1024: {
//                 items: 2.33
//             },
//             1440: {
//                 items: 3.1
//             }
//         }
//     });
// });

const swiper = new Swiper('.swiper', {
    slidesPerView: 3,
    spaceBetween: 10,
    loop: true,
    centeredSlides: true,

    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        360: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
    },
});