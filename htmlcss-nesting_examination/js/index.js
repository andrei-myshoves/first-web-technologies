document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("burger-menu");
  const nav = document.getElementById("header__nav");

  function handleToggleBurgerMenu() {
    nav.classList.toggle("active");
    burger.classList.toggle("open");

    const expanded = burger.classList.contains("open");
    burger.setAttribute("aria-expanded", expanded);

    if (expanded) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }

  burger.addEventListener("click", handleToggleBurgerMenu);
});
