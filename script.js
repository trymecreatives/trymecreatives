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
