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
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let current = 0;

function showSlide(index){

    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    slides[index].classList.add("active");
    dots[index].classList.add("active");

    current = index;
}

/* click dot */

dots.forEach((dot, i)=>{
    dot.addEventListener("click", ()=>{
        showSlide(i);
    });
});

/* auto slide */

setInterval(()=>{

    let next = current + 1;

    if(next >= slides.length){
        next = 0;
    }

    showSlide(next);

},5000);