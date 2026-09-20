document.querySelectorAll(".person-slider").forEach(function (slider) {
    const slides = slider.querySelector(".person-slides");
    const counter = slider.querySelector(".photo-count");
    const totalPhotos = slides.querySelectorAll("img").length;

    slides.addEventListener("scroll", function () {
        const currentPhoto =
            Math.round(slides.scrollLeft / slides.clientWidth) + 1;

        counter.textContent = currentPhoto + "/" + totalPhotos;
    });
});

document.querySelectorAll(".like-button").forEach(function (button) {
    button.addEventListener("click", function () {
        const count = button.querySelector(".like-count");
        const heart = button.querySelector(".heart");
        const liked = button.classList.toggle("liked");

        button.setAttribute("aria-pressed", liked);

        if (liked) {
            count.textContent = Number(count.textContent) + 1;
            heart.textContent = "♥";
        } else {
            count.textContent = Number(count.textContent) - 1;
            heart.textContent = "♡";
        }
    });
});