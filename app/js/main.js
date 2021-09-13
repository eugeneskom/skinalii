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

$('.select__checked').on('click', function () {
  $('.select__dropdown').toggleClass('select__dropdown--active');
});
$('.select__option').on('click', function () {
  let value = $(this).attr('data-value');
  $('#select-type').val(value);
  $('.select__checked').text(value);
  $('.select__dropdown').toggleClass('select__dropdown--active');
});