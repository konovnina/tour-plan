$(document).ready(function () {

  //Маска номера
  $("#phone-footer").mask("+7 (000) 000-0000");
  $("#phone-modal").mask("+7 (000) 000-0000");

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

  //Переменная для включения/отключения индикатора загрузки
  var spinner = $('.map').children('.loader');
  //Переменная для определения была ли хоть раз загружена Яндекс.Карта (чтобы избежать повторной загрузки при наведении)
  var check_if_load = false;
  //Необходимые переменные для того, чтобы задать координаты на Яндекс.Карте
  var myMapTemp, myPlacemarkTemp;

  //Функция создания карты сайта и затем вставки ее в блок с идентификатором &#34;map-yandex&#34;
  function init() {
    var myMapTemp = new ymaps.Map("map-yandex", {
      center: [7.890703, 98.294772], // координаты центра на карте
      zoom: 15, // коэффициент приближения карты
      controls: ['zoomControl', 'fullscreenControl'] // выбираем только те функции, которые необходимы при использовании
    });
    var myPlacemarkTemp = new ymaps.Placemark([7.890703, 98.294772], {
      balloonContentHeader: "DoubleTree by Hilton Hotel",
      balloonContentBody: "Pa Tong, Kathu, Phuket, Thailand",
      balloonContentFooter: "+66 76 34 08 50",
      hintContent: "Click here to read more"
    });
    myMapTemp.geoObjects.add(myPlacemarkTemp); // помещаем флажок на карту

    // Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
    var layer = myMapTemp.layers.get(0).get(0);

    // Решение по callback-у для определения полной загрузки карты
    waitForTilesLoad(layer).then(function () {
      // Скрываем индикатор загрузки после полной загрузки карты
      spinner.removeClass('is-active');
    });
  }

  // Функция для определения полной загрузки карты (на самом деле проверяется загрузка тайлов) 
  function waitForTilesLoad(layer) {
    return new ymaps.vow.Promise(function (resolve, reject) {
      var tc = getTileContainer(layer), readyAll = true;
      tc.tiles.each(function (tile, number) {
        if (!tile.isReady()) {
          readyAll = false;
        }
      });
      if (readyAll) {
        resolve();
      } else {
        tc.events.once("ready", function () {
          resolve();
        });
      }
    });
  }

  function getTileContainer(layer) {
    for (var k in layer) {
      if (layer.hasOwnProperty(k)) {
        if (
          layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer
          || layer[k] instanceof ymaps.layer.tileContainer.DomContainer
        ) {
          return layer[k];
        }
      }
    }
    return null;
  }

  // Функция загрузки API Яндекс.Карт по требованию (в нашем случае при наведении)
  function loadScript(url, callback) {
    var script = document.createElement("script");

    if (script.readyState) {  // IE
      script.onreadystatechange = function () {
        if (script.readyState == "loaded" ||
          script.readyState == "complete") {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {  // Другие браузеры
      script.onload = function () {
        callback();
      };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  }

  // Основная функция, которая проверяет когда мы навели на блок с классом &#34;ymap-container&#34;
  var ymap = function () {
    $('.map').mouseenter(function () {
      if (!check_if_load) { // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем

        // Чтобы не было повторной загрузки карты, мы изменяем значение переменной
        check_if_load = true;

        // Показываем индикатор загрузки до тех пор, пока карта не загрузится
        spinner.addClass('is-active');

        // Загружаем API Яндекс.Карт
        loadScript("https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;loadByRequire=1", function () {
          // Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором &#34;map-yandex&#34;
          ymaps.load(init);
        });
      }
    }
    );
  }

  $(function () {

    //Запускаем основную функцию
    ymap();

  });

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
          required: "This field is required",
          maxlength: "Incorrect phone",
          minlength: "Incorrect phone"
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