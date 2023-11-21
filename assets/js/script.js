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
  if (window.innerWidth > 880) {
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
  } else if (window.innerWidth <= 880) {
    navbarButton.style.display = "flex";
  } else {
    navbarButton.style.display = "none";
  }
});

document.querySelectorAll(".navbar-menu a").forEach(function (item) {
  item.addEventListener("click", function () {
    if (window.innerWidth <= 880) {
      navbarMenu.style.display = "none";
    }
  });
});

document.querySelectorAll(".navbar-button a").forEach(function (button) {
  button.addEventListener("click", function () {
    if (window.innerWidth <= 1080) {
      navbarButton.style.display = "none";
      navbarMenu.style.display = "none";
    }
  });
});

$(document).ready(function () {
    // Check if the current page is not berita.html or contains "berita"
    if (!window.location.pathname.includes("berita.html") && !window.location.pathname.includes("berita")
    && !window.location.pathname.includes("pengaduan.html") && !window.location.pathname.includes("pengaduan")) {
        var header = $("header");
        var button = $(".navbar-button .button");
    
        // Call the function to check header background
        checkHeaderBackground();
    
        // Combine scroll and resize event handlers
        $(window).on('scroll resize', function () {
            checkHeaderBackground();
        });
    
        function checkHeaderBackground() {
            if ($(window).scrollTop() > 0) {
                header.css({
                    background: "#01037C",
                    "border-bottom": "2px solid #FFC632",
                });
                button.addClass("scrolled");
            } else {
                if ($(window).width() > 1080) {
                        header.css({
                            background: "transparent",
                            "border-bottom": "2px solid #FFC632",
                        });
                    button.removeClass("scrolled");
                } else {
                    header.css({
                        background: "#01037C",
                        "border-bottom": "2px solid #FFC632",
                    });
                    button.addClass("scrolled");
                }
            }
        }
    }
});  

const swiper = new Swiper(".swiper", {
  slidesPerView: 3,
  spaceBetween: 10,
  loop: true,
  centeredSlides: true,

  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    360: {
      slidesPerView: 1,
    },
    375: {
      slidesPerView: 1,
    },
    480: {
      slidesPerView: 1,
    },
    645: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
    },
    880: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
    1440: {
      slidesPerView: 3,
    },
  },
});

document.addEventListener("DOMContentLoaded", function () {
  let currentIndex = 0;
  const items = document.querySelectorAll(".carousel-item");
  const totalItems = items.length;
  const indicatorsContainer = document.querySelector(".indicators");

  for (let i = 0; i < totalItems; i++) {
    const indicator = document.createElement("div");
    indicator.classList.add("indicator");
    indicator.setAttribute("data-index", i);
    indicator.addEventListener("click", function () {
      currentIndex = i;
      updateCarousel();
    });
    indicatorsContainer.appendChild(indicator);
  }

  indicatorsContainer.children[0].classList.add("active");

  function showNextSlide() {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
  }

  function updateCarousel() {
    const newTransformValue = -currentIndex * 100 + "%";
    document.querySelector(".carousel-inner").style.transform =
      "translateX(" + newTransformValue + ")";
    updateIndicators();
  }

  function updateIndicators() {
    const indicators = document.querySelectorAll(".indicator");
    indicators.forEach((indicator, index) => {
      if (index === currentIndex) {
        indicator.classList.add("active");
      } else {
        indicator.classList.remove("active");
      }
    });
  }

  setInterval(showNextSlide, 5000);
});
