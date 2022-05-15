"use strict";

/* Variables */
const header = document.querySelector(".header");
const navMenu = document.querySelector(".items--nav");
const carUserAccountMenu = document.querySelector(".items--cart-user");
const knowMoreButton = document.querySelector(".know-more");

const allSections = document.getElementsByTagName("section");

const dealContainers = document.querySelectorAll(".deal-container");
const cartItemsCount = document.querySelector(".cart-count");
const addToCartButtons = document.querySelectorAll(".button-cart");

const collections = document.querySelectorAll(".collection-container");

const footer = document.querySelector(".footer");

const dealsTextToggleContainers = document.querySelectorAll(
    ".deals-text-toggle-container"
);
const dealsRevealButtons = document.querySelectorAll(".deals-reveal-button");
const copyrightYear = document.querySelector(".copyright-year");

const buttonShowContentHTML = `
    <span class="text-xl mx-auto pointer-events-none uppercase">More Details</span>

    <span
        class="mt-2 text-3xl mx-auto"
    >
        <img
            src="./assets/images/icons/down-arrow.png"
            alt="Down Arrow"
            class="h-6 w-6"
        />
    </span>
`;

const buttonHideContentHTML = `
<span class="text-xl mx-auto pointer-events-none uppercase">Hide</span>

    <span
        class="mt-2 text-3xl mx-auto"
    >
        <img
            src="./assets/images/icons/up-arrow.png"
            alt="Up Arrow"
            class="h-6 w-6"
        />
    </span>
`;

/* Functions */
const initializeObserver = function () {
    const options = {
        root: null, // viewport
        threshold: 0.1,
        rootMargin: "0px",
    };

    const observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach((entry) => {
            // Fade-out the section if it goes out of view, else fade-in. And change header styles if not in hero section.
            if (!entry.isIntersecting) {
                entry.target.classList.add("fade-out");
                entry.target.classList.remove("fade-in");

                if (entry.target.classList.contains("section--hero")) {
                    header.classList.add("header-mini");
                }
            } else {
                entry.target.classList.remove("fade-out");
                entry.target.classList.add("fade-in");

                if (entry.target.classList.contains("section--hero")) {
                    header.classList.remove("header-mini");
                }
            }
        });
    }, options);

    Array.from(allSections).forEach((section) => {
        observer.observe(section);
    });
    dealContainers.forEach((dealContainer) => {
        observer.observe(dealContainer);
    });
    collections.forEach((collection) => {
        observer.observe(collection);
    });
    observer.observe(footer);
};

const setYear = function () {
    copyrightYear.innerText = new Date().getFullYear();
    window.removeEventListener("load", setYear);
};

const toggleDealsText = function (e) {
    const clickedButton = e.target;
    const targetContainerID = `${e.target.classList[1]}`.split("--")[1];
    const targetDealsContainer = document.querySelector(
        `.deals-text-container--${targetContainerID}`
    );
    const targetImageText = document.querySelector(
        `.image-title-text--${targetContainerID}`
    );
    const targetTextContainer = document.querySelector(
        `.reveal-text--${targetContainerID}`
    );

    targetTextContainer.classList.toggle("h-0");
    targetTextContainer.classList.toggle("opacity-0");

    clickedButton.innerHTML = clickedButton.classList.contains("button--show")
        ? buttonHideContentHTML
        : buttonShowContentHTML;

    targetDealsContainer.classList.toggle("p-4");

    targetImageText.classList.toggle("hidden");

    clickedButton.classList.toggle("button--show");
    clickedButton.classList.toggle("button--hide");
};

const updateCartCounter = function (e) {
    console.log(`Adding`);
    let count = (+window.localStorage.getItem("cartCount") || 0) + 1;
    cartItemsCount.textContent = count;

    cartItemsCount.classList.add("cart-active");

    setTimeout(function () {
        cartItemsCount.classList.remove("cart-active");
    }, 200);

    window.localStorage.setItem("cartCount", count);
};

/* Event Listeners */
window.addEventListener("load", function () {
    setYear();
    initializeObserver();
    cartItemsCount.textContent = window.localStorage.getItem("cartCount") || 0;
});

knowMoreButton.addEventListener("click", function () {
    const element = document.getElementById("section--best-deals");
    const headerOffset = 100;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
    });
});

dealsRevealButtons.forEach((button) => {
    button.addEventListener("click", toggleDealsText);
});

addToCartButtons.forEach((button) => {
    button.addEventListener("click", updateCartCounter);
});
