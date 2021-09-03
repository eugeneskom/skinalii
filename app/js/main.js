let menuBtn = document.querySelector('.menu-button');
let menu = document.querySelector('.menu');

menuBtn.addEventListener('click', () => {
  if(menu.classList.contains('menu--active')){
    menu.classList.remove('menu--active');
  }else{
    menu.classList.add('menu--active');
  }
})