$(".before-after").twentytwenty({
  before_label: "Без скинали",
  after_label: "Со скинали"
});

$(".before-slider").slick({
  draggable: false,
  dots: true,
  prevArrow: "<button class='slick-arrow--prev' type='button'><img src='images/before-slider/arrow-left.png' alt='Previous arrow'></button>",
  nextArrow: "<button class='slick-arrow--next' type='button'><img src='images/before-slider/arrow-right.png' alt='Next arrow'></button>"
});


let menuBtn = document.querySelector('.menu-button');
let menu = document.querySelector('.menu');
let navicon = document.querySelector('.navicon');

menuBtn.addEventListener('click', () => {
  if (menu.classList.contains('menu--active')) {
    menu.classList.remove('menu--active');
    navicon.classList.remove('navicon--active');
  } else {
    menu.classList.add('menu--active');
    navicon.classList.add('navicon--active');
  }
})

// Select set up


let input = document.querySelector('#select-type');
let selectChecked = document.querySelector('.select__checked');
let selectBody = document.querySelector('.select__dropdown');

selectChecked.addEventListener('click', () => {
  selectBody.classList.toggle('select__dropdown--active')
})
selectBody.addEventListener('click', (e) => {
  let option = e.target.innerHTML;
  console.log(option);
  selectBody.classList.toggle('select__dropdown--active')
  selectChecked.innerHTML = option;
  input.setAttribute('value', option)
})



//scroll to the exact place script
$("a[href^='#'").on('click', function(){
  let _href = $(this).attr("href");
  $("html, body").animate({scrollTop: $(_href).offset().top -150 + "px"});
  return false;
})

 // jquery mask

 $('input[type="tel"]').mask("+7 (999) 999-99-99");