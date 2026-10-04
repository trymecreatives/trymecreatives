/* =========================================================
   PEOPLE PHOTO COUNTERS
   ========================================================= */
document.querySelectorAll(".person-slider").forEach(function (slider) {
    const slides =
        slider.querySelector(".person-slides");
    const counter =
        slider.querySelector(".photo-count");
    if (!slides || !counter) {
        return;
    }
    const photos =
        slides.querySelectorAll("img");
    const totalPhotos =
        photos.length;
    if (totalPhotos === 0) {
        return;
    }
    function updatePhotoCounter() {
        if (slides.clientWidth === 0) {
            return;
        }
        let currentPhoto =
            Math.round(
                slides.scrollLeft /
                slides.clientWidth
            ) + 1;
        currentPhoto =
            Math.max(
                1,
                Math.min(
                    currentPhoto,
                    totalPhotos
                )
            );
        counter.textContent =
            currentPhoto + "/" + totalPhotos;
    }
    slides.addEventListener(
        "scroll",
        updatePhotoCounter
    );
    updatePhotoCounter();
});

/* =========================================================
   PEOPLE LIKE BUTTONS
   ========================================================= */
document.querySelectorAll(".like-button").forEach(function (button) {
    button.addEventListener("click", function () {
        const count =
            button.querySelector(".like-count");
        const heart =
            button.querySelector(".heart");
        if (!count || !heart) {
            return;
        }
        const liked =
            button.classList.toggle("liked");
        button.setAttribute(
            "aria-pressed",
            liked
        );
        if (liked) {
            count.textContent =
                Number(count.textContent) + 1;
            heart.textContent = "♥";
        } else {
            count.textContent =
                Math.max(
                    0,
                    Number(count.textContent) - 1
                );
            heart.textContent = "♡";
        }
    });
});

/* =========================================================
   PEOPLE SLIDER ARROWS
   ========================================================= */
document.querySelectorAll(".person-slider").forEach(function (slider) {
    const slides =
        slider.querySelector(".person-slides");
    const previousButton =
        slider.querySelector(".slider-arrow-left");
    const nextButton =
        slider.querySelector(".slider-arrow-right");
    if (!slides) {
        return;
    }

    /* =====================================================
       PREVIOUS BUTTON
       ===================================================== */
    if (previousButton) {
        previousButton.addEventListener(
            "click",
            function () {
                slides.scrollBy({
                    left:
                        -slides.clientWidth,
                    behavior:
                        "smooth"
                });
            }
        );
    }

    /* =====================================================
       NEXT BUTTON
       ===================================================== */
    if (nextButton) {
        nextButton.addEventListener(
            "click",
            function () {
                slides.scrollBy({
                    left:
                        slides.clientWidth,
                    behavior:
                        "smooth"
                });
            }
        );
    }
});

/* =========================================================
   PEOPLE I MAY KNOW AD
   ========================================================= */
const peopleAdText =
    document.querySelector(".people-ad-text");

if (peopleAdText) {
    const advertMessages = [
        " ADVERTISE ON THIS SPACE ",
        " FOR LOW PRICES ",
        " 1 MONTH CONTRACT "
    ];

    let currentMessage = 0;

    setInterval(function () {
        peopleAdText.classList.add(
            "ad-changing"
        );

        setTimeout(function () {
            currentMessage =
                (currentMessage + 1) %
                advertMessages.length;

            peopleAdText.textContent =
                advertMessages[currentMessage];

            peopleAdText.classList.remove(
                "ad-changing"
            );
        }, 250);
    }, 3000);
}

/* =========================================================
   MY CONTACT LIST AD
   ========================================================= */
const contactAdText =
    document.querySelector(".contact-ad-text");

if (contactAdText) {
    const contactMessages = [
        " ADVERTISE ON THIS SPACE ",
        " FOR LOW PRICES ",
        " 1 MONTH CONTRACT "
    ];

    let contactCurrentMessage = 0;

    setInterval(function () {
        contactAdText.classList.add(
            "ad-changing"
        );

        setTimeout(function () {
            contactCurrentMessage =
                (contactCurrentMessage + 1) %
                contactMessages.length;

            contactAdText.textContent =
                contactMessages[
                    contactCurrentMessage
                ];

            contactAdText.classList.remove(
                "ad-changing"
            );
        }, 250);
    }, 3000);
}

/* =========================================================
   MY CONTACT LIST
   AUTOMATIC IMAGE CROSSFADE
   ========================================================= */
document.querySelectorAll(".contact-card").forEach(function (card) {
    const slides =
        card.querySelector(".contact-slides");

    if (!slides) {
        return;
    }

    const images =
        slides.querySelectorAll("img");

    if (images.length === 0) {
        return;
    }

    let currentImage = 0;

    /* =====================================================
       SHOW ONLY THE FIRST IMAGE AT START
       ===================================================== */
    images.forEach(function (image, index) {
        image.classList.toggle(
            "contact-active",
            index === 0
        );
    });

    /* =====================================================
       CHANGE IMAGE EVERY 4 SECONDS
       ===================================================== */
    if (images.length > 1) {
        setInterval(function () {

            /* REMOVE CURRENT IMAGE */
            images[currentImage].classList.remove(
                "contact-active"
            );

            /* MOVE TO NEXT IMAGE */
            currentImage =
                (currentImage + 1) %
                images.length;

            /* SHOW NEXT IMAGE */
            images[currentImage].classList.add(
                "contact-active"
            );

        }, 4000);
    }
});

/* =========================================================
   MY CONTACT LIST
   MORE / LESS BUTTONS
   ========================================================= */
document.querySelectorAll(".contact-more").forEach(function (button) {
    button.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        const card =
            button.closest(".contact-card");

        if (!card) {
            return;
        }

        const expanded =
            card.classList.toggle("expanded");

        /* =====================================================
           CHANGE MORE TO LESS
           ===================================================== */
        if (expanded) {
            button.textContent = "LESS";
            button.setAttribute(
                "aria-expanded",
                "true"
            );
        } else {
            button.textContent = "MORE";
            button.setAttribute(
                "aria-expanded",
                "false"
            );
        }
    });
});

/* =========================================================
   MY PLAYLIST
   CLICK CARD TO CHANGE PLAYLIST INFORMATION
   ========================================================= */
const playlistItems =
    document.querySelectorAll(".playlist-item");

const playlistInfo =
    document.querySelector(".playlist-info");

if (playlistItems.length > 0 && playlistInfo) {

    const playlistImage =
        playlistInfo.querySelector(
            ".playlist-info-image img"
        );

    const playlistTitle =
        playlistInfo.querySelector(
            ".playlist-info-details h3"
        );

    const playlistDetails =
        playlistInfo.querySelector(
            ".playlist-info-details"
        );

    /* =====================================================
       YOUTUBE BUTTON
       This is ONLY the first Listen On icon.
       ===================================================== */
    const playlistYoutubeLink =
        playlistInfo.querySelector(
            ".playlist-youtube-link"
        );

    /* =====================================================
       PLAYLIST INFORMATION
       Change these details later for each playlist
       ===================================================== */
    const playlistData = {

        1: {
            title: "Her Contact List",
            songs: "16",
            age: "22+",
            by: "Drata",
            image: "Her contact list playlist.jpg",
            youtube: "https://www.youtube.com/watch?v=y3bQfOAsnY0&list=PLSfqw2jWuXfA&index=1"
        },

        2: {
            title: "His Contact list",
            songs: "1",
            age: "20+",
            by: "Tryme",
            image: "His Contact List.jpg",
            youtube: "https://www.youtube.com/watch?v=wOxtyldjy1E&list=PLVRhgEf3H_XM"
        },

        3: {
            title: "Write Maan Contact List",
            songs: "20",
            age: "25+",
            by: "Ar",
            image: "Write Maan Paylist.jpg",
            youtube: "https://www.youtube.com/watch?v=V7F9du-x_ds&list=PLQu8n_M7VIC0"
        },

        4: {
            title: "Her Bestfriend",
            songs: "15",
            age: "21+",
            by: "BS",
            image: "Her Bestie Playlist.jpg",
            youtube: "https://www.youtube.com/watch?v=gUbSPdTfYsw&list=PLJ6thRmW1Ba4"
        },

        5: {
            title: "New Bestfriend",
            songs: "18",
            age: "20+",
            by: "sTe",
            image: "3.png",
            youtube: "https://www.youtube.com/watch?v=WcrQu5mjpME&list=PLcYMmNVLlHBs"
        },

        6: {
            title: "Playlist 6",
            songs: "14",
            age: "18+",
            by: "tryme creatives",
            image: "YOUR-PLAYLIST-COVER-6.jpg",
            youtube: "YOUR-YOUTUBE-LINK-6"
        },

        7: {
            title: "Playlist 7",
            songs: "22",
            age: "21+",
            by: "tryme creatives",
            image: "YOUR-PLAYLIST-COVER-7.jpg",
            youtube: "YOUR-YOUTUBE-LINK-7"
        },

        8: {
            title: "Playlist 8",
            songs: "17",
            age: "18+",
            by: "tryme creatives",
            image: "YOUR-PLAYLIST-COVER-8.jpg",
            youtube: "YOUR-YOUTUBE-LINK-8"
        },

        9: {
            title: "Playlist 9",
            songs: "19",
            age: "18+",
            by: "tryme creatives",
            image: "YOUR-PLAYLIST-COVER-9.jpg",
            youtube: "YOUR-YOUTUBE-LINK-9"
        },

        10: {
            title: "Playlist 10",
            songs: "13",
            age: "18+",
            by: "tryme creatives",
            image: "YOUR-PLAYLIST-COVER-10.jpg",
            youtube: "YOUR-YOUTUBE-LINK-10"
        },

        11: {
            title: "Playlist 11",
            songs: "24",
            age: "21+",
            by: "tryme creatives",
            image: "YOUR-PLAYLIST-COVER-11.jpg",
            youtube: "YOUR-YOUTUBE-LINK-11"
        },

        12: {
            title: "Playlist 12",
            songs: "16",
            age: "18+",
            by: "tryme creatives",
            image: "YOUR-PLAYLIST-COVER-12.jpg",
            youtube: "YOUR-YOUTUBE-LINK-12"
        }
    };

    /* =====================================================
       CHANGE INFORMATION PANEL
       ===================================================== */
    function updatePlaylistInfo(playlistNumber) {

        const data =
            playlistData[playlistNumber];

        if (!data) {
            return;
        }

        /* CHANGE LARGE IMAGE */
        if (playlistImage) {

            playlistImage.src =
                data.image;

            playlistImage.alt =
                data.title;
        }

        /* CHANGE TITLE */
        if (playlistTitle) {

            playlistTitle.textContent =
                data.title;
        }

        /* CHANGE DETAILS */
        const songs =
            playlistDetails.querySelector(
                ".playlist-songs"
            );

        const age =
            playlistDetails.querySelector(
                ".playlist-age"
            );

        const creator =
            playlistDetails.querySelector(
                ".playlist-by"
            );

        if (songs) {

            songs.textContent =
                data.songs;
        }

        if (age) {

            age.textContent =
                data.age;
        }

        if (creator) {

            creator.textContent =
                data.by;
        }

        /* =================================================
           CHANGE YOUTUBE LINK
           The same icon is reused for every playlist.
           Only its destination changes.
           ================================================= */
        if (playlistYoutubeLink) {

            playlistYoutubeLink.href =
                data.youtube || "#";
        }
    }

    /* =====================================================
       CLICK PLAYLIST CARD
       ===================================================== */
    playlistItems.forEach(function (item) {

        item.addEventListener(
            "click",
            function () {

                const playlistNumber =
                    item.getAttribute(
                        "data-playlist"
                    );

                updatePlaylistInfo(
                    playlistNumber
                );

                /* REMOVE ACTIVE FROM ALL CARDS */
                playlistItems.forEach(function (card) {

                    card.classList.remove(
                        "playlist-active"
                    );
                });

                /* ADD ACTIVE TO CLICKED CARD */
                item.classList.add(
                    "playlist-active"
                );
            }
        );
    });

    /* =====================================================
       FIRST PLAYLIST SHOWN AT START
       ===================================================== */
    updatePlaylistInfo(1);

    if (playlistItems[0]) {

        playlistItems[0].classList.add(
            "playlist-active"
        );
    }
}

/* =========================================================
   PLAYLIST SECTION
   BOUNDARY + INVISIBLE REVEAL MASK
   ========================================================= */
const playlistGrid =
    document.querySelector(".playlist-grid");

const playlistInfoElement =
    document.querySelector(".playlist-info");

const playlistContent =
    document.querySelector(".playlist-content");

let playlistBoundaryLine = null;
let playlistRevealMask = null;

/* =========================================================
   CREATE BOUNDARY LINE
   ========================================================= */
if (
    playlistContent &&
    playlistInfoElement
) {

    playlistBoundaryLine =
        document.createElement("div");

    playlistBoundaryLine.className =
        "playlist-boundary-line";

    playlistContent.appendChild(
        playlistBoundaryLine
    );

    /* =====================================================
       CREATE INVISIBLE REVEAL MASK
       ===================================================== */
    playlistRevealMask =
        document.createElement("div");

    playlistRevealMask.className =
        "playlist-reveal-mask";

    playlistContent.appendChild(
        playlistRevealMask
    );
}

/* =========================================================
   UPDATE PLAYLIST BOUNDARY
   ========================================================= */
function updatePlaylistBoundary() {

    if (
        !playlistContent ||
        !playlistInfoElement ||
        !playlistBoundaryLine
    ) {
        return;
    }

    /*
       On phone/tablet layout,
       hide the boundary and mask.
    */
    if (window.innerWidth <= 700) {

        playlistBoundaryLine.style.display =
            "none";

        if (playlistRevealMask) {

            playlistRevealMask.style.display =
                "none";
        }

        return;
    }

    playlistBoundaryLine.style.display =
        "block";

    if (playlistRevealMask) {

        playlistRevealMask.style.display =
            "block";
    }

    const contentRect =
        playlistContent.getBoundingClientRect();

    const infoRect =
        playlistInfoElement.getBoundingClientRect();

    const boundaryPosition =
        infoRect.bottom -
        contentRect.top;

    /* =====================================================
       POSITION WHITE BOUNDARY LINE
       ===================================================== */
    playlistBoundaryLine.style.top =
        boundaryPosition + "px";

    /* =====================================================
       POSITION INVISIBLE MASK
       ===================================================== */
    if (
        playlistRevealMask &&
        playlistGrid
    ) {

        const gridRect =
            playlistGrid.getBoundingClientRect();

        playlistRevealMask.style.top =
            boundaryPosition + "px";

        playlistRevealMask.style.left =
            (gridRect.left - contentRect.left) + "px";

        playlistRevealMask.style.width =
            gridRect.width + "px";

        playlistRevealMask.style.bottom =
            "0";
    }
}

/* =========================================================
   PLAYLIST CARD VISIBILITY
   Cards are NOT individually hidden anymore.
   The invisible mask creates the reveal effect.
   ========================================================= */
function updatePlaylistVisibility() {

    if (!playlistGrid) {
        return;
    }

    playlistGrid
        .querySelectorAll(".playlist-item")
        .forEach(function (card) {

            card.classList.remove(
                "playlist-below-info"
            );

            card.classList.add(
                "playlist-visible"
            );
        });

    updatePlaylistBoundary();
}

/* =========================================================
   INITIAL CHECK
   ========================================================= */
window.addEventListener(
    "load",
    function () {

        updatePlaylistVisibility();
        updatePlaylistBoundary();
    }
);

/* =========================================================
   UPDATE WHILE PAGE IS SCROLLING
   ========================================================= */
window.addEventListener(
    "scroll",
    function () {

        updatePlaylistBoundary();
    },
    { passive: true }
);

/* =========================================================
   UPDATE WHEN WINDOW SIZE CHANGES
   ========================================================= */
window.addEventListener(
    "resize",
    function () {

        updatePlaylistVisibility();
        updatePlaylistBoundary();
    }
);

/* =========================================================
   SMALL DELAY AFTER PAGE LOAD
   ========================================================= */
setTimeout(
    function () {

        updatePlaylistVisibility();
        updatePlaylistBoundary();
    },
    300
);
