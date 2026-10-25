
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



/* ==========================================
   SELECTABLE PRODUCTS
   Temporary sample product details
   ========================================== */

(() => {
  const cards = document.querySelectorAll(".product-item");

  const name = document.getElementById("productName");
  const price = document.getElementById("productPrice");
  const size = document.getElementById("productSize");
  const features = document.getElementById("productFeatures");
  const units = document.getElementById("productUnits");
  const mainPhoto = document.getElementById("mainPhoto");
  const photoButton = document.getElementById("productPhoto");

  if (
    !cards.length ||
    !name ||
    !price ||
    !size ||
    !features ||
    !units ||
    !mainPhoto
  ) {
    return;
  }

  const products = [
    {
      name: "Fatoon",
      price: "500/=",
      size: "XXL",
      features: "Comfortable everyday wear with a stylish finish.",
      units: "14"
    },
    {
      name: "Classic Style",
      price: "500/=",
      size: "XL",
      features: "A classic design for everyday use.",
      units: "10"
    },
    {
      name: "Urban Look",
      price: "500/=",
      size: "L",
      features: "A modern look with a comfortable fit.",
      units: "8"
    },
    {
      name: "Premium Choice",
      price: "600/=",
      size: "XXL",
      features: "A premium sample design.",
      units: "6"
    },
    {
      name: "Everyday Essential",
      price: "800/=",
      size: "M",
      features: "A simple and versatile style.",
      units: "12"
    },
    {
      name: "Street Classic",
      price: "500/=",
      size: "XL",
      features: "A bold style for casual outfits.",
      units: "9"
    },
    {
      name: "Modern Fit",
      price: "1000/=",
      size: "L",
      features: "A modern design with a clean finish.",
      units: "7"
    },
    {
      name: "Signature Style",
      price: "500/=",
      size: "XXL",
      features: "A distinctive sample style.",
      units: "5"
    },
    {
      name: "Casual Comfort",
      price: "500/=",
      size: "M",
      features: "A relaxed style for casual occasions.",
      units: "11"
    },
    {
      name: "Limited Edition",
      price: "600/=",
      size: "XL",
      features: "A special sample design.",
      units: "3"
    }
  ];

  function selectProduct(card, index) {
    const image = card.querySelector("img");

    if (!image) return;

    const product = products[index] || {
      name: `Sample Product ${index + 1}`,
      price: "Price to be added",
      size: "Size to be added",
      features: "Sample features to be added.",
      units: "Not set"
    };

    // Update all header details.
    name.textContent = product.name;
    price.textContent = product.price;
    size.textContent = product.size;
    features.textContent = product.features;
    units.textContent = product.units;

    // Update the large header photo.
    mainPhoto.src = image.currentSrc || image.src;
    mainPhoto.alt = image.alt || product.name;

    // Highlight only the currently selected card.
    cards.forEach((item) => {
      const selected = item === card;

      item.classList.toggle("is-selected", selected);
      item.setAttribute("aria-pressed", String(selected));
    });

    if (photoButton) {
      photoButton.setAttribute(
        "aria-label",
        `View selected photo: ${product.name}`
      );
    }
  }

  cards.forEach((card, index) => {
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-pressed", "false");

    card.addEventListener("click", () => {
      selectProduct(card, index);
    });

    card.addEventListener("keydown", (event) => {
      if (event.target !== card) return;

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectProduct(card, index);
      }
    });
  });

  // Select the first product when the page loads.
  selectProduct(cards[0], 0);
})();
