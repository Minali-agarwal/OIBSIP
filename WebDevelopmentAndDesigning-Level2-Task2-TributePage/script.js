
window.addEventListener("load", () => {

    console.log("Tribute Page Loaded Successfully!");

});


const image = document.querySelector(".hero img");

image.addEventListener("mouseenter", () => {

    image.style.transform = "scale(1.05)";
    image.style.transition = "0.4s";

});

image.addEventListener("mouseleave", () => {

    image.style.transform = "scale(1)";

});



const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }

    });

}, {
    threshold: 0.2
});

sections.forEach(section => {

    section.style.opacity = "0";
    section.style.transform = "translateY(40px)";
    section.style.transition = "all 0.8s ease";

    observer.observe(section);

});