const burger = document.querySelector(".burger-menu");
const nav = document.querySelector(".header__nav");

burger.addEventListener("click", (e) => {
  e.preventDefault(); 
  nav.classList.toggle("active");
  burger.classList.toggle("open"); 
});
