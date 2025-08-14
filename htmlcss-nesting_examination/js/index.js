document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("burger-menu");
  const nav = document.getElementById("header__nav");

  function handleToggleBurgerMenu() {
    nav.classList.toggle("active");
    burger.classList.toggle("open");
    burger.setAttribute("aria-expanded", burger.classList.contains("open"));
  }

  burger.addEventListener("click", handleToggleBurgerMenu);
});
