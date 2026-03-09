const tabs = document.querySelectorAll(".hot-title p");
const lists = document.querySelectorAll(".hot-list");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {

        tabs.forEach(t => t.classList.remove("active"));
        lists.forEach(l => l.classList.remove("active"));

        tab.classList.add("active");

        const target = document.getElementById(tab.dataset.tab);
        target.classList.add("active");
    });
});
const carouselContainers = document.querySelectorAll(".carousel-container");

carouselContainers.forEach(container => {
    const carousel = container.querySelector(".carousel");
    const prevBtn = container.querySelector(".prev");
    const nextBtn = container.querySelector(".next");
    const card = container.querySelector('.card');
    if (!card) return; 

    prevBtn.onclick = () => {
        const scrollAmount = card.offsetWidth + 10; 
        carousel.scrollBy({left: -scrollAmount, behavior: "smooth"});
    };

    nextBtn.onclick = () => {
        const scrollAmount = card.offsetWidth + 10;
        carousel.scrollBy({left: scrollAmount, behavior: "smooth"});
    };
});