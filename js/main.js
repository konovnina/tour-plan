var mySwiper = new Swiper('.swiper-container', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // Navigation arrows
  navigation: {
    nextEl: '.slider-button--next',
    prevEl: '.slider-button--prev',
  },

  //Keyboard control
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },

})


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

