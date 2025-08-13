bdocument.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger-menu');
  const nav = document.querySelector('.header__nav');

  burger.addEventListener('click', () => {
    nav.classList.toggle('active'); 
    burger.classList.toggle('open');

    burger.setAttribute('aria-expanded', burger.classList.contains('open'));
  });
});