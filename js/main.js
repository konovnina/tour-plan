$(document).ready(function () {
  $("#phone-footer").mask("+7 (999) 999-9999");
  $("#phone-modal").mask("+7 (999) 999-9999");

  var hotelSlider = new Swiper('.hotel-slider', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,

    // Navigation arrows
    navigation: {
      nextEl: '.hotel-slider__button--next',
      prevEl: '.hotel-slider__button--prev',
    },

    //Keyboard control
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },

  });

  var reviewsSlider = new Swiper('.reviews-slider', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,

    // Navigation arrows
    navigation: {
      nextEl: '.reviews-slider__button--next',
      prevEl: '.reviews-slider__button--prev',
    },

    //Keyboard control
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },

  });


  ymaps.ready(init);

  function init() {
    // Создание карты.
    var myMap = new ymaps.Map("map-wrapper", {
      center: [7.890703, 98.294772],
      zoom: 15,
    }),
      myPlacemark = new ymaps.Placemark([7.890703, 98.294772], {
        balloonContentHeader: "DoubleTree by Hilton Hotel",
        balloonContentBody: "Pa Tong, Kathu, Phuket, Thailand",
        balloonContentFooter: "+66 76 34 08 50",
        hintContent: "Click here to read more"
      });
    myMap.geoObjects.add(myPlacemark);

  }

  var menuButton = $(".menu-button");
  menuButton.on('click', function () {
    $(".navbar-bottom").toggleClass('navbar-bottom--visible');

  });

  document.body.addEventListener('keyup', function (event) {
    var key = event.keyCode;
    if (key == 27) {
      console.log('close modal');
      closeModal(event);
    };
  }, false);

  var modalButton = $('[data-toggle=modal]');
  var closeModalButton = $('.modal__close');
  modalButton.on('click', openModal);
  closeModalButton.on('click', closeModal);

  function openModal() {
    var modalOverlay = $('.modal__overlay');
    var modalDialog = $('.modal__dialog');
    modalOverlay.addClass('modal__overlay--visible')
    modalDialog.addClass('modal__dialog--visible')
  }

  function closeModal(event) {
    event.preventDefault();
    var modalOverlay = $('.modal__overlay');
    var modalDialog = $('.modal__dialog');
    modalOverlay.removeClass('modal__overlay--visible')
    modalDialog.removeClass('modal__dialog--visible')
  }
}); 