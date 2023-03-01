document.querySelector('div.mobile-hamburger').addEventListener('click', () => {
  document.querySelector('nav').classList.add('expanded');
  document.querySelector('div.scroll-container').style.visibility = "hidden";
})
document.querySelector('div.nav-overlay').addEventListener('click', () => {
  document.querySelector('nav').classList.remove('expanded');
  document.querySelector('div.scroll-container').style.visibility = "visible";
})