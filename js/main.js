$(document).ready(function () {

  //Маска номера
  $("#phone-footer").mask("+7 (999) 999-9999");
  $("#phone-modal").mask("+7 (999) 999-9999");

  //Слайдер в секции Отель
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

  //Слайдер в секции Отзывы
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

  //Подключение и настройка карты
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

  //Мобильное меню
  var menuButton = $(".menu-button");
  menuButton.on('click', function () {
    $(".navbar-bottom").toggleClass('navbar-bottom--visible');

  });

  //Закрытие модального окна по кнопке Esc
  document.body.addEventListener('keyup', function (event) {
    var key = event.keyCode;
    if (key == 27) {
      console.log('close modal');
      closeModal(event);
    };
  }, false);

  //Настройки модального окна
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

  //Обработка формы
  $('.form').each(function () {
    $(this).validate({
      errorClass: "invalid",
      messages: {
        name: {
          required: "This field is required",
          minlength: jQuery.validator.format("At least {0} characters required"),
          maxlength: jQuery.validator.format("You have exceeded the maximum length of {0} characters")
        },
        email: {
          required: "This field is required",
          email: "Your email address must be in the format of name@domain.com"
        },
        phone: {
          required: "This field is required"
        },
        message: {
          required: "This field is required",
          minlength: jQuery.validator.format("At least {0} characters required"),
          maxlength: jQuery.validator.format("You have exceeded the maximum length of {0} characters")
        }
      }
    });
  });

  //Подключение анимации
  AOS.init();
}); 