$(document).ready(function () {
    var header = $("header");
    var navbarButtonKontak = $(".navbar-button .kontak");
    var navbarButtonPengajuan = $(".navbar-button .pengajuan");

    // Ketika dokumen dimuat, periksa posisi pengguliran awal
    checkHeaderBackground();

    // Memonitor peristiwa pengguliran
    $(window).scroll(function () {
        checkHeaderBackground();
    });

    // Fungsi untuk memeriksa dan mengubah latar belakang header
    function checkHeaderBackground() {
        if ($(window).scrollTop() > 0) {
            header.css({
                'background': '#01037C', // Ganti dengan warna latar belakang yang Anda inginkan
                'border-bottom': '2px solid #FFC632'
            });
            navbarButtonKontak.css({
                'background': 'var(--primary)',
                'color': 'black'
            });
            navbarButtonPengajuan.css({
                'background': 'var(--primary)',
                'color': 'black'
            });
        } else {
            header.css({
                'background': 'transparent',
                'border-bottom': '2px solid #FFC632'
            });
            navbarButtonKontak.css({
                'background': 'var(--secondary)',
                'color': 'white'
            });
            navbarButtonPengajuan.css({
                'background': 'transparent',
                'color': 'white'
            });
        }
    }
});

$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        center: true,
        navText: [
            "<i class='fas fa-arrow-left'></i>",
            "<i class='fas fa-arrow-right'></i>"
        ],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 3
            }
        }
    });
});