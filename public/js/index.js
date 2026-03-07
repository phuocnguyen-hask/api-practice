const tabs = document.querySelectorAll(".hot-title p");
const lists = document.querySelectorAll(".hot-list");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {

        const target = tab.dataset.tab;

        // đổi tab active
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        // hide tất cả list
        lists.forEach(list => list.style.display = "none");

        // show list được chọn
        document.getElementById(target).style.display = "block";
    });
});