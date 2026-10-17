const menuButton = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

menuButton.addEventListener("click", () => {
  const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isExpanded));
  primaryNav.classList.toggle("is-open", !isExpanded);
});

primaryNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton.setAttribute("aria-expanded", "false");
    primaryNav.classList.remove("is-open");
  });
});

const slides = [...document.querySelectorAll(".hero-slide")];
const dots = [...document.querySelectorAll(".slide-dot")];
let activeSlide = 0;
let slideTimer;

function showSlide(index) {
  activeSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === activeSlide;
    slide.classList.toggle("is-active", isActive);
    slide.setAttribute("aria-hidden", String(!isActive));
    dots[slideIndex].classList.toggle("is-active", isActive);
    if (isActive) {
      dots[slideIndex].setAttribute("aria-current", "true");
    } else {
      dots[slideIndex].removeAttribute("aria-current");
    }
  });
}

function restartSlideTimer() {
  window.clearInterval(slideTimer);
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    slideTimer = window.setInterval(() => showSlide(activeSlide + 1), 5000);
  }
}

document.querySelector(".previous").addEventListener("click", () => {
  showSlide(activeSlide - 1);
  restartSlideTimer();
});

document.querySelector(".next").addEventListener("click", () => {
  showSlide(activeSlide + 1);
  restartSlideTimer();
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
    restartSlideTimer();
  });
});

showSlide(0);
restartSlideTimer();
