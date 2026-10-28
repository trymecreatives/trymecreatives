
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
      features: "Comfortable everyday wear.",
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



/* =====================================
   PAGE LIKE BUTTON
===================================== */

(() => {
    const likeButton = document.getElementById("likeButton");
    const likeCount = document.getElementById("likeCount");
    const likeLabel = document.getElementById("likeLabel");

    if (!likeButton || !likeCount || !likeLabel) return;

    const likedKey = "elvisPageLiked";
    const countKey = "elvisPageLikeCount";

    function readNumber(key) {
        try {
            const value = Number(localStorage.getItem(key));
            return Number.isFinite(value) && value >= 0 ? value : 0;
        } catch {
            return 0;
        }
    }

    function readLiked() {
        try {
            return localStorage.getItem(likedKey) === "true";
        } catch {
            return false;
        }
    }

    let liked = readLiked();
    let count = readNumber(countKey);

    function renderLike() {
        likeCount.textContent = count;
        likeLabel.textContent = liked ? "Liked" : "Like";
        likeButton.querySelector(".like-symbol").textContent =
            liked ? "♥" : "♡";

        likeButton.classList.toggle("liked", liked);
        likeButton.setAttribute("aria-pressed", String(liked));
    }

    likeButton.addEventListener("click", () => {
        // Save this browser's like state.
        const nextLiked = !liked;

        try {
            localStorage.setItem(likedKey, String(nextLiked));
            localStorage.setItem(
                countKey,
                String(Math.max(0, count + (nextLiked ? 1 : -1)))
            );
        } catch {
            // The button still works for this page session
            // if browser storage is unavailable.
        }

        count = Math.max(0, count + (nextLiked ? 1 : -1));
        liked = nextLiked;
        renderLike();
    });

    renderLike();
})();


/* =====================================
   COPY CURRENT PAGE LINK
===================================== */

(() => {
    const copyButton = document.getElementById("copyLinkButton");

    if (!copyButton) return;

    copyButton.addEventListener("click", async () => {
        const pageUrl = window.location.href;
        const originalText = "Copy link";

        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(pageUrl);
            } else {
                // Fallback for local files or unsupported browsers.
                window.prompt("Copy this page link:", pageUrl);
                return;
            }

            copyButton.textContent = "Link copied!";
        } catch {
            window.prompt("Copy this page link:", pageUrl);
            return;
        }

        window.setTimeout(() => {
            copyButton.textContent = originalText;
        }, 1800);
    });
})();


/* =========================================
   ELVIS PAGE LIKES — SUPABASE
   ========================================= */

(function () {
    const button = document.getElementById("likeButton");
    const count = document.getElementById("likeCount");
    const label = document.getElementById("likeLabel");

    if (!button || !count || !label) return;

    const heart = button.querySelector(".like-symbol");

    const SUPABASE_URL =
        "https://kxpakoczmzaryebfygfq.supabase.co";

    const SUPABASE_KEY =
        "sb_publishable_hg5dj-tO1IbtfTIC4c-ALA_ihLAYzvU";

    let visitorId = localStorage.getItem("tryme_elvis_voter_id");

    if (!visitorId) {
        visitorId = crypto.randomUUID();
        localStorage.setItem("tryme_elvis_voter_id", visitorId);
    }

    const headers = {
        "Content-Type": "application/json",
        "apikey": SUPABASE_KEY,
        "Authorization": "Bearer " + SUPABASE_KEY
    };

    let liked = false;

    function showLikedState(value) {
        liked = value;
        button.classList.toggle("liked", liked);
        button.setAttribute("aria-pressed", String(liked));
        label.textContent = liked ? "Liked" : "Like";

        if (heart) {
            heart.textContent = liked ? "♥" : "♡";
        }
    }

    async function loadElvisLikes() {
        count.textContent = "…";

        try {
            const results = await Promise.all([
                fetch(
                    SUPABASE_URL +
                    "/rest/v1/elvis_likes?select=id",
                    { headers }
                ),
                fetch(
                    SUPABASE_URL +
                    "/rest/v1/rpc/has_elvis_liked",
                    {
                        method: "POST",
                        headers,
                        body: JSON.stringify({
                            p_visitor_id: visitorId
                        })
                    }
                )
            ]);

            if (!results[0].ok || !results[1].ok) {
                throw new Error("Could not load Elvis likes");
            }

            const rows = await results[0].json();
            const visitorLiked = await results[1].json();

            count.textContent = rows.length;
            showLikedState(visitorLiked === true);
        } catch (error) {
            console.error("Elvis likes:", error);
            count.textContent = "—";
        }
    }

    button.addEventListener("click", async function () {
        const newLikedState = !liked;

        button.disabled = true;

        try {
            const response = await fetch(
                SUPABASE_URL + "/rest/v1/rpc/set_elvis_like",
                {
                    method: "POST",
                    headers,
                    body: JSON.stringify({
                        p_visitor_id: visitorId,
                        p_liked: newLikedState
                    })
                }
            );

            if (!response.ok) {
                throw new Error(await response.text());
            }

            const newCount = await response.json();

            count.textContent = newCount;
            showLikedState(newLikedState);
        } catch (error) {
            console.error("Elvis like error:", error);
            alert("Your like could not be saved. Please try again.");
        } finally {
            button.disabled = false;
        }
    });

    loadElvisLikes();
})();

/* =========================================
   COPY ELVIS PAGE LINK
   ========================================= */

(function () {
    const button = document.getElementById("copyLinkButton");

    if (!button) return;

    button.addEventListener("click", async function () {
        try {
            await navigator.clipboard.writeText(window.location.href);
            button.textContent = "Copied!";

            setTimeout(function () {
                button.textContent = "Copy link";
            }, 1800);
        } catch (error) {
            prompt("Copy this page link:", window.location.href);
        }
    });
})();
