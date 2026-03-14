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
document.addEventListener("DOMContentLoaded", () => {

  const toggle = document.getElementById("chat-toggle")
  const container = document.getElementById("chat-container")
  const closeBtn = document.getElementById("chat-close")

  const form = document.getElementById("chat-form")
  const input = document.getElementById("chat-input")
  const messages = document.getElementById("chat-messages")

  toggle.onclick = () => {
    container.style.display = "flex"
  }

  closeBtn.onclick = () => {
    container.style.display = "none"
  }

  form.addEventListener("submit", async (e) => {

    e.preventDefault()

    const text = input.value.trim()

    if(!text) return

    messages.innerHTML += `<div class="user-msg">${text}</div>`

    input.value=""

    try{

      const res = await fetch("/chat",{
        method:"POST",
        headers:{
          "Content-Type":"application/x-www-form-urlencoded"
        },
        body:new URLSearchParams({
          message:text
        })
      })

      const data = await res.json()

      messages.innerHTML += `<div class="ai-msg">${data.reply}</div>`

      messages.scrollTop = messages.scrollHeight

    }catch(err){

      messages.innerHTML += `<div class="ai-msg">Server error</div>`

    }

  })

})