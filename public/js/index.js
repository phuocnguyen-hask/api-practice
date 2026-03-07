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