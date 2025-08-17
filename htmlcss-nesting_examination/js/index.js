document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("burger-menu");
  const nav = document.getElementById("header__nav");
  const links = document.querySelectorAll(".header__nav-link");

  function toggleMenu() {
    const isOpen = burger.classList.toggle("open");
    nav.classList.toggle("active", isOpen);
    document.body.classList.toggle("no-scroll", isOpen);
    burger.setAttribute("aria-expanded", isOpen);
  }

  burger.addEventListener("click", toggleMenu);

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");

      if (targetId.startsWith("#")) {
        e.preventDefault();

        burger.classList.remove("open");
        nav.classList.remove("active");
        document.body.classList.remove("no-scroll");
        burger.setAttribute("aria-expanded", false);

        setTimeout(() => {
          document.querySelector(targetId).scrollIntoView({
            behavior: "smooth",
          });
        }, 300);
      }
    });
  });
});
