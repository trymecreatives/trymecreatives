
/* =====================================
   HEADER DROPDOWN MENU
===================================== */

const menuButton = document.getElementById("menuButton");
const headerMenu = document.getElementById("headerMenu");

if (menuButton && headerMenu) {
    menuButton.addEventListener("click", function (event) {
        event.stopPropagation();

        const isOpen = headerMenu.classList.toggle("open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    headerMenu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            headerMenu.classList.remove("open");
            menuButton.setAttribute("aria-expanded", "false");
        });
    });

    document.addEventListener("click", function (event) {
        if (
            !menuButton.contains(event.target) &&
            !headerMenu.contains(event.target)
        ) {
            headerMenu.classList.remove("open");
            menuButton.setAttribute("aria-expanded", "false");
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            headerMenu.classList.remove("open");
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.focus();
        }
    });
}


/* =====================================
   SELECTED PRODUCT PHOTO
===================================== */

const photoButton = document.getElementById("productPhoto");
const mainPhoto = document.getElementById("mainPhoto");

if (photoButton && mainPhoto) {
    photoButton.addEventListener("click", function () {
        if (mainPhoto.src) {
            window.open(
                mainPhoto.src,
                "_blank",
                "noopener,noreferrer"
            );
        }
    });
}


/* =====================================
   TOP-RIGHT FEATURED SLIDESHOW
===================================== */

const featuredSlider = document.getElementById("featuredSlider");

const featuredTrack = featuredSlider
    ? featuredSlider.querySelector(".featured-track")
    : null;

const featuredSlides = featuredTrack
    ? featuredTrack.querySelectorAll(".featured-slide")
    : [];

let featuredIndex = 0;

if (featuredTrack && featuredSlides.length > 1) {
    featuredTrack.style.transform = "translateX(0%)";

    setInterval(function () {
        featuredIndex =
            (featuredIndex + 1) % featuredSlides.length;

        featuredTrack.style.transform =
            `translateX(-${featuredIndex * 100}%)`;
    }, 3000);
}


/* =====================================
   LOWER-RIGHT CONTINUOUS CROSSFADE
===================================== */

const lowerGalleryTimers = new Map();

function setupLowerPictureGalleries() {
    const galleries = document.querySelectorAll(
        ".lower-picture .fade-gallery"
    );

    galleries.forEach(function (gallery) {
        // Stop an existing timer if this gallery is refreshed.
        if (lowerGalleryTimers.has(gallery)) {
            clearInterval(lowerGalleryTimers.get(gallery));
            lowerGalleryTimers.delete(gallery);
        }

        const images = Array.from(
            gallery.querySelectorAll("img")
        );

        // Clear old animation styles and active states.
        images.forEach(function (image) {
            image.style.animation = "";
            image.style.animationDelay = "";
            image.style.opacity = "";
            image.classList.remove("is-active");
        });

        if (images.length === 0) {
            return;
        }

        // Start with the first image visible.
        let currentIndex = 0;
        images[currentIndex].classList.add("is-active");

        // One image needs no slideshow timer.
        if (images.length === 1) {
            return;
        }

        // Time each picture stays before the next crossfade.
        const displayDuration = 3500;

        const timer = setInterval(function () {
            const nextIndex = (currentIndex + 1) % images.length;

            const currentImage = images[currentIndex];
            const nextImage = images[nextIndex];

            // Show the incoming image while the current
            // image is still visible.
            nextImage.classList.add("is-active");

            // Both opacity transitions happen together.
            currentImage.classList.remove("is-active");

            currentIndex = nextIndex;
        }, displayDuration);

        lowerGalleryTimers.set(gallery, timer);
    });
}

// Initialise every lower gallery in the HTML.
setupLowerPictureGalleries();

// Call this after adding cards dynamically with JavaScript.
function refreshLowerPictureGalleries() {
    setupLowerPictureGalleries();
}
